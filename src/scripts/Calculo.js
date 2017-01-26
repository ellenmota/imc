export function calcular(peso,altura) {
  peso = parseFloat(peso);
  altura = parseFloat(altura);

  return peso / (altura * altura);
}
