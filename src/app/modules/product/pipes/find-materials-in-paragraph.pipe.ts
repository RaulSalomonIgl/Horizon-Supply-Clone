import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findMaterialsInParagraph',
  standalone: true,
})
export class FindMaterialsInParagraphPipe implements PipeTransform {
  transform(value: string): string {
    // Expresión regular para encontrar el contenido dentro de las etiquetas <p>...</p>
    const regex = /<p[^>]*>(.*?)<\/p>/g;

    // Array para almacenar las coincidencias que contienen '%'
    const paragraphsWithPercent: string[] = [];

    // Encontramos todas las coincidencias en el contenido HTML
    const matches = [...value.matchAll(regex)];

    // Iteramos sobre las coincidencias
    matches.forEach((match) => {
      const paragraphContent = match[1]; // El contenido dentro de <p>...</p>

      if (paragraphContent.includes('%')) {
        // Convertir el contenido HTML en un objeto DOM para manipulación
        const parser = new DOMParser();
        const doc = parser.parseFromString(paragraphContent, 'text/html');

        // Reemplazar los <br> por puntos (.)
        doc.body.innerHTML = doc.body.innerHTML.replace(/<br\s*\/?>/gi, '. ');

        // Extraer el texto limpio (sin etiquetas)
        const text = doc.body.textContent?.replace(/\s+/g, ' ').trim() || '';

        paragraphsWithPercent.push(text);
      }
    });

    return paragraphsWithPercent.join('. ');
  }
}
