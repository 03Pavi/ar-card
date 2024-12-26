import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvVarValidatorHandler {
  private requiredEnvVars = [
    'NODE_ENV',
    'APP_NAME',
    'APP_PORT',
    'APP_FORWARD_PORT',
    'DB_HOST',
    'DB_PORT',
    'DB_USER',
    'DB_PASSWORD',
    'DB_DATABASE',
    'DB_FORWARD_PORT',
  ];

  constructor(private configService: ConfigService) { }

  public handle(): string[] {
    return this.requiredEnvVars.filter(envVar => !this.configService.get(envVar));
  }
}