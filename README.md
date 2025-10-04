# PDF Metadata Editor

A modern, client-side PDF metadata editor built with Next.js. Edit PDF metadata directly in your browser without uploading files to any server - 100% privacy-focused.

![PDF Metadata Editor](https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg?auto=compress&cs=tinysrgb&w=1200)

## Features

- **100% Client-Side Processing** - All PDF operations happen in your browser. No uploads, no server processing.
- **Full Metadata Support** - Edit Title, Author, Subject, Keywords, Creator, Producer, Creation Date, and Modification Date.
- **Internationalization** - Built-in support for English and Portuguese (Brazil) with persistent language selection.
- **Dark Theme** - Beautiful, modern dark theme optimized for extended use.
- **Drag & Drop** - Easy file upload with drag-and-drop support.
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop devices.
- **Type-Safe** - Built with TypeScript for enhanced reliability.

## Technology Stack

- **Next.js 13.5** - React framework with App Router
- **TypeScript** - Type-safe development
- **pdf-lib** - Client-side PDF manipulation
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide Icons** - Beautiful, consistent icons
- **Sonner** - Toast notifications

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd pdf-metadata-editor
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Upload a PDF** - Drag and drop a PDF file onto the dropzone, or click to browse and select a file.
2. **View Existing Metadata** - The form will automatically populate with the PDF's current metadata.
3. **Edit Fields** - Modify any of the metadata fields as needed:
   - **Title** - Document title
   - **Author** - Document author
   - **Subject** - Document subject/description
   - **Keywords** - Comma-separated keywords for searchability
   - **Creator** - Application that created the original document
   - **Producer** - Application that produced the PDF
   - **Creation Date** - When the document was created
   - **Modification Date** - When the document was last modified
4. **Apply & Download** - Click "Apply and Download" to generate and download the PDF with updated metadata.
5. **Clear Fields** - Use "Clear All Fields" to reset all metadata fields.

### Language Support

Click the language selector in the header to switch between:
- English (EN)
- Português (BR)

Your language preference is automatically saved to localStorage.

## Build & Deployment

### Production Build

Build the application for production:

```bash
npm run build
```

This creates an optimized production build in the `.next` directory.

### Start Production Server

Run the production build locally:

```bash
npm run start
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Deploy with one click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Deploy to Other Platforms

This application can be deployed to any platform that supports Next.js:

- **Netlify** - Use the `npm run build` command
- **GitHub Pages** - Configure static export in `next.config.js`
- **Docker** - Use the official Next.js Docker example
- **Self-hosted** - Run `npm run build && npm run start`

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with dark theme
│   ├── page.tsx            # Main application page
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Header with language selector
│   ├── Dropzone.tsx        # File upload component
│   ├── MetadataForm.tsx    # Metadata editing form
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── pdf.ts              # PDF reading/writing utilities
│   ├── dates.ts            # Date conversion utilities
│   ├── i18n-context.tsx    # Internationalization context
│   └── utils.ts            # General utilities
├── i18n/
│   ├── en.json             # English translations
│   └── pt.json             # Portuguese translations
└── public/                 # Static assets
```

## Known Limitations

### Current Version

- **Encrypted PDFs** - Cannot edit metadata for password-protected or encrypted PDFs
- **Single File Processing** - Only one PDF can be processed at a time
- **Large Files** - Very large PDFs (>100MB) may cause performance issues in the browser
- **XMP Metadata** - Advanced XMP metadata is not currently supported
- **Browser Memory** - Limited by browser's available memory for processing

### Browser Compatibility

Tested and working on:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Development

### Type Checking

Run TypeScript type checking:

```bash
npm run typecheck
```

### Linting

Run ESLint:

```bash
npm run lint
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Privacy & Security

- **No Data Collection** - This application does not collect, store, or transmit any data
- **Client-Side Only** - All PDF processing happens locally in your browser
- **No Analytics** - No tracking or analytics are implemented
- **Open Source** - Full source code is available for review

## Support

If you encounter any issues or have questions:

1. Check the [Known Limitations](#known-limitations) section
2. Open an issue on GitHub with details about the problem
3. Include browser version and console errors if applicable

## Acknowledgments

- [pdf-lib](https://pdf-lib.js.org/) - Excellent PDF manipulation library
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Lucide Icons](https://lucide.dev/) - Clean, consistent icon set
- [Pexels](https://pexels.com/) - Stock photography for this README
