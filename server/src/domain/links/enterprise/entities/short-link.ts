import { Entity, type EntityProps } from '@/core/entities/entity';
import type { Optional } from '@/core/types/optional';

export type ShortLinkProps = {
  originalUrl: string;
  code: string;
  accessCount: number;
};

export class ShortLink extends Entity<ShortLinkProps, string> {
  get originalUrl(): string {
    return this.props.originalUrl;
  }

  get code(): string {
    return this.props.code;
  }

  get accessCount(): number {
    return this.props.accessCount;
  }

  public incrementAccessCount(): void {
    this.props.accessCount += 1;
  }

  public static create(
    props: EntityProps<Optional<ShortLinkProps, 'accessCount'>, string>
  ): ShortLink {
    return new ShortLink({
      ...props,
      accessCount: props.accessCount ?? 0,
    });
  }
}
