import { PreviewImage } from './preview-image.model';

export class Medum {
  constructor(
    public alt: any,
    public id: number,
    public position: number,
    public preview_image: PreviewImage,
    public aspect_ratio: number,
    public height: number,
    public media_type: string,
    public src: string,
    public width: number
  ) {}
}
