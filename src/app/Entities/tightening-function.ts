export class TighteningFunction {
  name: string;
  nom: number;
  act: number;

  constructor(data) {
    this.name = data['name'];
    this.nom = data['nom'];
    this.act = data['act'];
  }
}
