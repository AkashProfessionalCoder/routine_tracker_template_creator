import { toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';

export const exportToPDF = async (elementIds, fileName) => {
    // Support both single element (string) and multiple elements (array)
    const ids = Array.isArray(elementIds) ? elementIds : [elementIds];

    try {
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: 'a4'
        });

        for (let i = 0; i < ids.length; i++) {
            const element = document.getElementById(ids[i]);
            if (!element) continue;

            // Use JPEG with 0.8 quality for better compression
            const dataUrl = await toJpeg(element, { quality: 0.8, backgroundColor: '#ffffff' });

            // Add new page for subsequent elements
            if (i > 0) {
                pdf.addPage();
            }

            // Get PDF page dimensions
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Calculate aspect ratio to fit image to page
            const imgWidth = element.scrollWidth;
            const imgHeight = element.scrollHeight;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

            const scaledWidth = imgWidth * ratio;
            const scaledHeight = imgHeight * ratio;

            // Center the image on the page
            const x = (pdfWidth - scaledWidth) / 2;
            const y = (pdfHeight - scaledHeight) / 2;

            pdf.addImage(dataUrl, 'JPEG', x, y, scaledWidth, scaledHeight);
        }

        pdf.save(fileName);
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert(`Failed to generate PDF: ${error.message}`);
    }
};
