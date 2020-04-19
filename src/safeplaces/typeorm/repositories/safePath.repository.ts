import * as uuid from 'uuid/v4'
import { Repository, EntityRepository } from 'typeorm'
import { InternalServerErrorException } from '@nestjs/common'
import { SafePath } from '../entities/safepath.entity'
import { PublishDto } from 'src/safeplaces/types/payload/publish.dto'
import { PublishRes } from 'src/safeplaces/types/response/publish.interface'

@EntityRepository(SafePath)
export class SafePathRepo extends Repository<SafePath> {
  async saveSafePath(payload: PublishDto, user): Promise<PublishRes> {
    const {
      authority_name,
      publish_date_utc,
      info_website,
      concern_points
    } = payload

    const sp = new SafePath()
    sp.id = uuid()
    sp.orgId = ''
    sp.infoWebsite = info_website
    sp.authorityName = authority_name
    sp.concernPoints = concern_points
    sp.publishDateUtc = publish_date_utc
    sp.userId = user.id
    sp.createdAt = new Date()

    try {
      await sp.save()
      return {
        datetime_created: sp.createdAt,
        organization_id: '',
        safe_path: {
          authority_name: sp.authorityName,
          concern_points: sp.concernPoints,
          info_website: sp.infoWebsite,
          publish_date_utc: sp.publishDateUtc
        },
        user_id: user.id
      }
    } catch (err) {
      throw new InternalServerErrorException()
    }
  }
}
