import { Injectable } from "@nestjs/common";
import { OutboxStatus } from "src/domain/outbox-message/enums/outbox-message-status.enum";
import { OutboxMessage } from "src/domain/outbox-message/outbox-message.entity";
import { Event } from "src/domain/common/event";
import { DataSource, EntityManager, Repository } from "typeorm";

@Injectable()
export class OutboxMessageRepository extends Repository<OutboxMessage> {
    constructor(private dataSource: DataSource) {
        super(OutboxMessage, dataSource.createEntityManager());
    }

    createOutboxPayloadFromEvent = (outbox_message: Event): OutboxMessagePayloadType => {
        return {
            message_id: outbox_message.getId(),
            type: outbox_message.getType(),
            properties: outbox_message.getProperties(),
            headers: outbox_message.getHeaders(),
            body: outbox_message.getPayload(),
        };
    }
    async storeOutboxMessage(
        outbox_message: Event,
        transactionalEntityManager: EntityManager
    ) {
        return await transactionalEntityManager
            .save(OutboxMessage, this.createOutboxPayloadFromEvent(outbox_message));
    }

    async getUnsentMessages(limit: number) {
        const [data, total] = await this.findAndCount({
            where: { status: OutboxStatus.PENDING },
            take: limit
        });
        return { data, total };
    }

}