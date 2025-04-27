# Indira Artisan AI - Indian Architectural Visualization Platform

An AI-powered architectural visualization platform tailored to India's cultural, linguistic, and architectural diversity. This platform enables architects to generate designs reflecting traditional and modern Indian styles while supporting multilingual accessibility.

## 🌟 Features

### Core Features (Phase 1)
- **Sketch-to-Render Engine**
  - Support for 10+ Indian architectural styles
  - Traditional material rendering
  - Real-time visualization
- **Multilingual Support**
  - Hindi, English, Tamil, and Bengali interfaces
  - Architectural terminology in multiple languages
- **Style Template Library**
  - 50+ preloaded templates
  - Regional architectural elements
  - Traditional motifs and patterns

### Advanced Features (Phase 2)
- BIM Export capabilities
- Collaboration tools
- Climate analysis integration

## 🛠 Tech Stack

### Frontend
- React.js
- Three.js
- i18next (multilingual support)
- Tailwind CSS

### Backend
- Python (FastAPI)
- PostgreSQL
- Redis (caching)

### AI/ML
- PyTorch
- Stable Diffusion (fine-tuned)
- IndicBERT (NLP)

### Infrastructure
- AWS EC2/S3
- Kubernetes
- Docker

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python 3.9+
- Docker
- AWS CLI (for deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/indira-artisan-ai.git
cd indira-artisan-ai
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Start the development servers:
```bash
# Frontend
npm run dev

# Backend
cd backend
uvicorn main:app --reload
```

## 📚 Documentation

- [API Documentation](./docs/api.md)
- [Style Guide](./docs/style-guide.md)
- [Localization Handbook](./docs/localization.md)
- [Architecture Guide](./docs/architecture.md)

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details.

## 🙏 Acknowledgments

- Indian architectural heritage and traditions
- Open source community
- Contributors and maintainers

## 📞 Support

For support, email support@indiraartisan.ai or join our Slack channel.

## 📁 Data Structure

```
data/
└── training/
    ├── Mughal/
    ├── Dravidian/
    ├── Rajput/
    ├── Bengal/
    └── metadata.json
```
