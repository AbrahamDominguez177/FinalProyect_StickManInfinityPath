// components/utils/CheckpointList.js

// Nodo para lista doble
class Nodo {
  constructor(valor) {
    this.valor = valor; // valor = { x, y, nivel }
    this.siguiente = null;
    this.previo = null;
  }
}

// Clase principal para manejar los checkpoints
export default class ListaDobleCheckpoints {
  constructor(limite = 3) {
    this.inicio = null;
    this.fin = null;
    this.limite = limite;
    this.tamaño = 0;
  }

  // Agregar un nuevo checkpoint SOLO si es del nivel 5
  add(valor) {
    if (valor.nivel !== 5) return; // solo nivel 5

    const nuevo = new Nodo(valor);

    if (this.inicio === null) {
      this.inicio = nuevo;
      this.fin = nuevo;
    } else {
      this.fin.siguiente = nuevo;
      nuevo.previo = this.fin;
      this.fin = nuevo;
    }

    this.tamaño++;

    if (this.tamaño > this.limite) {
      this.removeFirst();
    }
  }

  // Eliminar el primer nodo (más viejo)
  removeFirst() {
    if (this.inicio !== null) {
      this.inicio = this.inicio.siguiente;
      if (this.inicio !== null) {
        this.inicio.previo = null;
      } else {
        this.fin = null;
      }
      this.tamaño--;
    }
  }

  // Obtener el último checkpoint guardado
  getLastCheckpoint() {
    return this.fin ? this.fin.valor : null;
  }

  // Limpiar todos los checkpoints
  clear() {
    this.inicio = null;
    this.fin = null;
    this.tamaño = 0;
  }

  // Saber si la lista está vacía
  isEmpty() {
    return this.inicio === null;
  }

  // Obtener el tamaño actual
  size() {
    return this.tamaño;
  }

  // Ver en consola los checkpoints actuales
  mostrarCheckpoints() {
    let temp = this.inicio;
    let index = 1;
    while (temp !== null) {
      console.log(`${index++}. Nivel: ${temp.valor.nivel}, Pos: (${temp.valor.x}, ${temp.valor.y})`);
      temp = temp.siguiente;
    }
  }
}
