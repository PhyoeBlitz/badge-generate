import { useState } from 'react';
import JSZip from 'jszip';
import './App.css';

interface TechInfo {
  bg: string;
  name: string;
}

interface HexagonData {
  iconName: string;
  techInfo: TechInfo;
  iconUrl: string;
}

const techColors: Record<string, TechInfo> = {
  'ts': { bg: '#3178C6', name: 'TypeScript' },
  'js': { bg: '#F7DF1E', name: 'JavaScript' },
  'react': { bg: '#61DAFB', name: 'React' },
  'vue': { bg: '#4FC08D', name: 'Vue.js' },
  'angular': { bg: '#DD0031', name: 'Angular' },
  'python': { bg: '#3776AB', name: 'Python' },
  'java': { bg: '#ED8B00', name: 'Java' },
  'php': { bg: '#777BB4', name: 'PHP' },
  'go': { bg: '#00ADD8', name: 'Go' },
  'rust': { bg: '#000000', name: 'Rust' },
  'aws': { bg: '#FF9900', name: 'AWS' },
  'docker': { bg: '#2496ED', name: 'Docker' },
  'kubernetes': { bg: '#326CE5', name: 'Kubernetes' },
  'jenkins': { bg: '#D33833', name: 'Jenkins' },
  'html': { bg: '#E34F26', name: 'HTML5' },
  'css': { bg: '#1572B6', name: 'CSS3' },
  'sass': { bg: '#CC6699', name: 'Sass' },
  'nodejs': { bg: '#339933', name: 'Node.js' },
  'express': { bg: '#000000', name: 'Express' },
  'mysql': { bg: '#4479A1', name: 'MySQL' },
  'postgresql': { bg: '#336791', name: 'PostgreSQL' },
  'mongodb': { bg: '#47A248', name: 'MongoDB' },
  'redis': { bg: '#DC382D', name: 'Redis' },
  'git': { bg: '#F05032', name: 'Git' },
  'github': { bg: '#181717', name: 'GitHub' },
  'gitlab': { bg: '#FCA326', name: 'GitLab' },
  'vscode': { bg: '#007ACC', name: 'VS Code' },
  'figma': { bg: '#F24E1E', name: 'Figma' },
  'laravel': { bg: '#FF2D20', name: 'Laravel' },
  'django': { bg: '#092E20', name: 'Django' },
  'flask': { bg: '#000000', name: 'Flask' },
  'fastapi': { bg: '#009688', name: 'FastAPI' },
  'spring': { bg: '#6DB33F', name: 'Spring' },
  'bootstrap': { bg: '#7952B3', name: 'Bootstrap' },
  'tailwind': { bg: '#06B6D4', name: 'Tailwind CSS' },
  'nextjs': { bg: '#000000', name: 'Next.js' },
};

function App() {
  const [inputUrl, setInputUrl] = useState('https://skillicons.dev/icons?i=ts,react,python,aws');
  const [hexagons, setHexagons] = useState<HexagonData[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const adjustBrightness = (hex: string, percent: number): string => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  };

  const generateHexagons = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsGenerating(true);

    if (!inputUrl.trim()) {
      setErrorMessage('Please enter a Skill Icons URL');
      setIsGenerating(false);
      return;
    }

    if (!inputUrl.includes('skillicons.dev/icons?i=')) {
      setErrorMessage('Invalid URL format. Please use: https://skillicons.dev/icons?i=iconname');
      setIsGenerating(false);
      return;
    }

    try {
      const url = new URL(inputUrl);
      const iconsParam = url.searchParams.get('i');

      if (!iconsParam) {
        setErrorMessage('No icons found in URL. Make sure to include ?i=iconname');
        setIsGenerating(false);
        return;
      }

      const icons = iconsParam.split(',');

      if (icons.length === 0) {
        setErrorMessage('No valid icons found');
        setIsGenerating(false);
        return;
      }

      const hexagonData: HexagonData[] = icons.map(icon => {
        const cleanIcon = icon.trim();
        const techInfo = techColors[cleanIcon.toLowerCase()] || { bg: '#667eea', name: cleanIcon };
        return {
          iconName: cleanIcon,
          techInfo,
          iconUrl: `https://skillicons.dev/icons?i=${cleanIcon}`
        };
      });

      setHexagons(hexagonData);
      setSuccessMessage(`Successfully generated ${icons.length} hexagon badge(s)!`);
    } catch (error) {
      setErrorMessage('Invalid URL format. Please check your URL and try again.');
    }

    setIsGenerating(false);
  };

  const createSVG = async (hexagonData: HexagonData, width: number, height: number): Promise<string> => {
    const centerX = width / 2;
    const centerY = height / 2;

    const points = [
      [centerX - 30, centerY],
      [centerX - 15, centerY - 26],
      [centerX + 15, centerY - 26],
      [centerX + 30, centerY],
      [centerX + 15, centerY + 26],
      [centerX - 15, centerY + 26]
    ].map(point => point.join(',')).join(' ');

    // Use CORS proxy for development
    const proxyUrl = import.meta.env.DEV 
      ? `/api/skillicons/icons?i=${hexagonData.iconName}`
      : `https://api.allorigins.win/raw?url=${encodeURIComponent(hexagonData.iconUrl)}`;

    // Get image as base64
    let base64Image = hexagonData.iconUrl;
    try {
      const response = await fetch(proxyUrl);
      const blob = await response.blob();
      base64Image = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.warn('Could not convert image to base64, using original URL:', error);
      // Fallback: use original URL directly in SVG
      base64Image = hexagonData.iconUrl;
    }

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <g>
          <polygon points="${points}" 
                  fill="${hexagonData.techInfo.bg}" 
                  stroke="${adjustBrightness(hexagonData.techInfo.bg, -30)}" 
                  stroke-width="2"/>
          <image href="${base64Image}" 
                 x="${centerX - 20}" y="${centerY - 20}" 
                 width="40" height="40"/>
        </g>
      </svg>
    `;
  };

  const convertSVGtoPNG = (svgContent: string, width: number, height: number): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      const scale = 2;
      canvas.width = width * scale;
      canvas.height = height * scale;
      ctx.scale(scale, scale);

      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.onload = () => {
        // Draw the SVG directly without background
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          URL.revokeObjectURL(svgUrl);
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        }, 'image/png', 1.0);
      };

      img.onerror = () => {
        URL.revokeObjectURL(svgUrl);
        reject(new Error('Failed to load SVG'));
      };

      img.src = svgUrl;
    });
  };

  const saveAllAsPNG = async () => {
    if (hexagons.length === 0) {
      setErrorMessage('No hexagons to save. Please generate some badges first.');
      return;
    }

    setIsDownloading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const zip = new JSZip();

      // Create individual PNG files
      for (let i = 0; i < hexagons.length; i++) {
        const hexagon = hexagons[i];
        const svgContent = await createSVG(hexagon, 120, 120);
        const pngBlob = await convertSVGtoPNG(svgContent, 120, 120);
        
        zip.file(`${hexagon.iconName}-badge.png`, pngBlob);
      }

      // Generate zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      
      // Download zip
      const link = document.createElement('a');
      link.download = 'skill-badges.zip';
      link.href = URL.createObjectURL(zipBlob);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      setSuccessMessage(`Successfully saved ${hexagons.length} PNG badges in a zip file!`);
    } catch (error) {
      setErrorMessage('Error creating PNG files. Please try again.');
      console.error('Error:', error);
    }

    setIsDownloading(false);
  };

  const exampleUrls = [
    { label: 'Single Icon', url: 'https://skillicons.dev/icons?i=ts' },
    { label: 'Frontend Stack', url: 'https://skillicons.dev/icons?i=js,ts,react,vue' },
    { label: 'Python Stack', url: 'https://skillicons.dev/icons?i=python,django,flask,fastapi' },
    { label: 'DevOps Stack', url: 'https://skillicons.dev/icons?i=aws,docker,kubernetes,jenkins' },
    { label: 'Full Stack', url: 'https://skillicons.dev/icons?i=html,css,js,php,mysql' }
  ];

  return (
    <div className="app">
      <div className="container">
        <h1>🎯 Hexagon Skill Icons Generator</h1>
        
        <div className="input-group">
          <label htmlFor="iconUrl">Paste Skill Icons URL:</label>
          <input 
            type="text" 
            id="iconUrl" 
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="https://skillicons.dev/icons?i=ts,react,python,aws"
            onKeyPress={(e) => e.key === 'Enter' && generateHexagons()}
          />
        </div>
        
        <button 
          className="btn" 
          onClick={generateHexagons}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Hexagon Badges'}
        </button>
        
        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}
        
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        
        <div className="output-section">
          <h3>Output:</h3>
          <div className="hexagon-container">
            {hexagons.map((hexagon, index) => (
              <div 
                key={index}
                className="hexagon"
                style={{
                  background: `linear-gradient(135deg, ${hexagon.techInfo.bg} 0%, ${adjustBrightness(hexagon.techInfo.bg, -20)} 100%)`
                }}
                title={hexagon.techInfo.name}
              >
                <img 
                  src={hexagon.iconUrl} 
                  alt={hexagon.iconName} 
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          
          {hexagons.length > 0 && (
            <div className="download-section">
              <button 
                className="btn btn-secondary" 
                onClick={saveAllAsPNG}
                disabled={isDownloading}
              >
                {isDownloading ? 'Creating ZIP...' : '💾 Save All as PNG Zip'}
              </button>
            </div>
          )}
        </div>
        
        <div className="example-section">
          <h3>📝 Example URLs:</h3>
          <div className="example-links">
            {exampleUrls.map((example, index) => (
              <div 
                key={index}
                className="example-link" 
                onClick={() => setInputUrl(example.url)}
              >
                <strong>{example.label}:</strong><br />
                <code>{example.url}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
