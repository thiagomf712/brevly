import { UniqueEntityID, type UniqueEntityIDType } from './unique-entity-id'

export type EntityProps<
  Props extends object,
  Id extends UniqueEntityIDType,
> = Props & { id: Id }

export abstract class Entity<
  Props extends object,
  Id extends UniqueEntityIDType,
> {
  private _id: UniqueEntityID<Id>
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor({ id, ...props }: EntityProps<Props, Id>) {
    this.props = props as Props
    this._id = new UniqueEntityID(id)
  }

  public equals(entity: Entity<object, UniqueEntityIDType>): boolean {
    if (entity === this) return true

    return entity.id.equals(this._id)
  }
}
