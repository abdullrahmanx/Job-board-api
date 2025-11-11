import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';
import { ApplicationsModule } from './applications/applications.module';
import { PrismaModule } from './prisma/prisma.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [AuthModule, UsersModule, JobsModule, ApplicationsModule,PrismaModule, CloudinaryModule, CompaniesModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
