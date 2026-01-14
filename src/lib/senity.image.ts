/* eslint-disable @typescript-eslint/no-explicit-any */
import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './senity'

const builder = createImageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)