export type CompostId = Record<string, string | number>

export type UniqueEntityIDType = string | number | CompostId

export class UniqueEntityID<Id extends UniqueEntityIDType> {
  private value: Id

  toString(): string {
    switch (typeof this.value) {
      case 'string': {
        return this.value
      }
      case 'number': {
        return this.value.toString()
      }
      case 'object': {
        return Object.entries(this.value)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([_, value]) => value)
          .join('-')
      }
    }
  }

  toValue() {
    return this.value
  }

  constructor(value: Id) {
    this.value = value
  }

  public equals(id: UniqueEntityID<Id> | Id): boolean {
    if (id instanceof UniqueEntityID) {
      return id.toString() === this.toString()
    }

    return new UniqueEntityID(id).toString() === this.toString()
  }
}
