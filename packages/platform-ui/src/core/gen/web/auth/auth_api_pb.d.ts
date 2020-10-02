import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class SignUpRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): SignUpRequest;

  getPassword(): string;
  setPassword(value: string): SignUpRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignUpRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SignUpRequest): SignUpRequest.AsObject;
  static serializeBinaryToWriter(message: SignUpRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignUpRequest;
  static deserializeBinaryFromReader(message: SignUpRequest, reader: jspb.BinaryReader): SignUpRequest;
}

export namespace SignUpRequest {
  export type AsObject = {
    email: string,
    password: string,
  }
}

export class SignUpResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignUpResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SignUpResponse): SignUpResponse.AsObject;
  static serializeBinaryToWriter(message: SignUpResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignUpResponse;
  static deserializeBinaryFromReader(message: SignUpResponse, reader: jspb.BinaryReader): SignUpResponse;
}

export namespace SignUpResponse {
  export type AsObject = {
  }
}

export class SignInRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): SignInRequest;

  getPassword(): string;
  setPassword(value: string): SignInRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignInRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SignInRequest): SignInRequest.AsObject;
  static serializeBinaryToWriter(message: SignInRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignInRequest;
  static deserializeBinaryFromReader(message: SignInRequest, reader: jspb.BinaryReader): SignInRequest;
}

export namespace SignInRequest {
  export type AsObject = {
    email: string,
    password: string,
  }
}

export class SignInResponse extends jspb.Message {
  getSessionId(): string;
  setSessionId(value: string): SignInResponse;

  getExpireTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setExpireTime(value?: google_protobuf_timestamp_pb.Timestamp): SignInResponse;
  hasExpireTime(): boolean;
  clearExpireTime(): SignInResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignInResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SignInResponse): SignInResponse.AsObject;
  static serializeBinaryToWriter(message: SignInResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignInResponse;
  static deserializeBinaryFromReader(message: SignInResponse, reader: jspb.BinaryReader): SignInResponse;
}

export namespace SignInResponse {
  export type AsObject = {
    sessionId: string,
    expireTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class SignOutRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignOutRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SignOutRequest): SignOutRequest.AsObject;
  static serializeBinaryToWriter(message: SignOutRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignOutRequest;
  static deserializeBinaryFromReader(message: SignOutRequest, reader: jspb.BinaryReader): SignOutRequest;
}

export namespace SignOutRequest {
  export type AsObject = {
  }
}

export class SignOutResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignOutResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SignOutResponse): SignOutResponse.AsObject;
  static serializeBinaryToWriter(message: SignOutResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignOutResponse;
  static deserializeBinaryFromReader(message: SignOutResponse, reader: jspb.BinaryReader): SignOutResponse;
}

export namespace SignOutResponse {
  export type AsObject = {
  }
}

export class RefreshSessionRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RefreshSessionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RefreshSessionRequest): RefreshSessionRequest.AsObject;
  static serializeBinaryToWriter(message: RefreshSessionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RefreshSessionRequest;
  static deserializeBinaryFromReader(message: RefreshSessionRequest, reader: jspb.BinaryReader): RefreshSessionRequest;
}

export namespace RefreshSessionRequest {
  export type AsObject = {
  }
}

export class RefreshSessionResponse extends jspb.Message {
  getExpireTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setExpireTime(value?: google_protobuf_timestamp_pb.Timestamp): RefreshSessionResponse;
  hasExpireTime(): boolean;
  clearExpireTime(): RefreshSessionResponse;

  getEmail(): string;
  setEmail(value: string): RefreshSessionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RefreshSessionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RefreshSessionResponse): RefreshSessionResponse.AsObject;
  static serializeBinaryToWriter(message: RefreshSessionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RefreshSessionResponse;
  static deserializeBinaryFromReader(message: RefreshSessionResponse, reader: jspb.BinaryReader): RefreshSessionResponse;
}

export namespace RefreshSessionResponse {
  export type AsObject = {
    expireTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    email: string,
  }
}

export class ResetPasswordRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): ResetPasswordRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResetPasswordRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ResetPasswordRequest): ResetPasswordRequest.AsObject;
  static serializeBinaryToWriter(message: ResetPasswordRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResetPasswordRequest;
  static deserializeBinaryFromReader(message: ResetPasswordRequest, reader: jspb.BinaryReader): ResetPasswordRequest;
}

export namespace ResetPasswordRequest {
  export type AsObject = {
    email: string,
  }
}

export class ResetPasswordResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResetPasswordResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ResetPasswordResponse): ResetPasswordResponse.AsObject;
  static serializeBinaryToWriter(message: ResetPasswordResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResetPasswordResponse;
  static deserializeBinaryFromReader(message: ResetPasswordResponse, reader: jspb.BinaryReader): ResetPasswordResponse;
}

export namespace ResetPasswordResponse {
  export type AsObject = {
  }
}

