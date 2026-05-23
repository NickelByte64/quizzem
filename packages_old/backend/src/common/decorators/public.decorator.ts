import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const PUBLIC_METADATA = '__PUBLIC_METADATA__';

export const Public = (): CustomDecorator => SetMetadata(PUBLIC_METADATA, true);
