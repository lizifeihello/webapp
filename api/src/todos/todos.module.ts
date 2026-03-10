import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { firestoreProvider } from '../common/firebasestore/firestore.provider';

@Module({
  controllers: [TodosController],
  providers: [TodosService, firestoreProvider]
})
export class TodosModule {}
