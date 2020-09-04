/**
 * @fileoverview gRPC-Web generated client stub for percona.platform.auth.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

import {
  RefreshSessionRequest,
  RefreshSessionResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  SignInRequest,
  SignInResponse,
  SignOutRequest,
  SignOutResponse,
  SignUpRequest,
  SignUpResponse} from './auth_api_pb';

export class AuthAPIClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoSignUp = new grpcWeb.AbstractClientBase.MethodInfo(
    SignUpResponse,
    (request: SignUpRequest) => {
      return request.serializeBinary();
    },
    SignUpResponse.deserializeBinary
  );

  signUp(
    request: SignUpRequest,
    metadata: grpcWeb.Metadata | null): Promise<SignUpResponse>;

  signUp(
    request: SignUpRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: SignUpResponse) => void): grpcWeb.ClientReadableStream<SignUpResponse>;

  signUp(
    request: SignUpRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: SignUpResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        new URL('/percona.platform.auth.v1.AuthAPI/SignUp', this.hostname_).toString(),
        request,
        metadata || {},
        this.methodInfoSignUp,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/percona.platform.auth.v1.AuthAPI/SignUp',
    request,
    metadata || {},
    this.methodInfoSignUp);
  }

  methodInfoSignIn = new grpcWeb.AbstractClientBase.MethodInfo(
    SignInResponse,
    (request: SignInRequest) => {
      return request.serializeBinary();
    },
    SignInResponse.deserializeBinary
  );

  signIn(
    request: SignInRequest,
    metadata: grpcWeb.Metadata | null): Promise<SignInResponse>;

  signIn(
    request: SignInRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: SignInResponse) => void): grpcWeb.ClientReadableStream<SignInResponse>;

  signIn(
    request: SignInRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: SignInResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        new URL('/percona.platform.auth.v1.AuthAPI/SignIn', this.hostname_).toString(),
        request,
        metadata || {},
        this.methodInfoSignIn,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/percona.platform.auth.v1.AuthAPI/SignIn',
    request,
    metadata || {},
    this.methodInfoSignIn);
  }

  methodInfoSignOut = new grpcWeb.AbstractClientBase.MethodInfo(
    SignOutResponse,
    (request: SignOutRequest) => {
      return request.serializeBinary();
    },
    SignOutResponse.deserializeBinary
  );

  signOut(
    request: SignOutRequest,
    metadata: grpcWeb.Metadata | null): Promise<SignOutResponse>;

  signOut(
    request: SignOutRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: SignOutResponse) => void): grpcWeb.ClientReadableStream<SignOutResponse>;

  signOut(
    request: SignOutRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: SignOutResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        new URL('/percona.platform.auth.v1.AuthAPI/SignOut', this.hostname_).toString(),
        request,
        metadata || {},
        this.methodInfoSignOut,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/percona.platform.auth.v1.AuthAPI/SignOut',
    request,
    metadata || {},
    this.methodInfoSignOut);
  }

  methodInfoRefreshSession = new grpcWeb.AbstractClientBase.MethodInfo(
    RefreshSessionResponse,
    (request: RefreshSessionRequest) => {
      return request.serializeBinary();
    },
    RefreshSessionResponse.deserializeBinary
  );

  refreshSession(
    request: RefreshSessionRequest,
    metadata: grpcWeb.Metadata | null): Promise<RefreshSessionResponse>;

  refreshSession(
    request: RefreshSessionRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: RefreshSessionResponse) => void): grpcWeb.ClientReadableStream<RefreshSessionResponse>;

  refreshSession(
    request: RefreshSessionRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: RefreshSessionResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        new URL('/percona.platform.auth.v1.AuthAPI/RefreshSession', this.hostname_).toString(),
        request,
        metadata || {},
        this.methodInfoRefreshSession,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/percona.platform.auth.v1.AuthAPI/RefreshSession',
    request,
    metadata || {},
    this.methodInfoRefreshSession);
  }

  methodInfoResetPassword = new grpcWeb.AbstractClientBase.MethodInfo(
    ResetPasswordResponse,
    (request: ResetPasswordRequest) => {
      return request.serializeBinary();
    },
    ResetPasswordResponse.deserializeBinary
  );

  resetPassword(
    request: ResetPasswordRequest,
    metadata: grpcWeb.Metadata | null): Promise<ResetPasswordResponse>;

  resetPassword(
    request: ResetPasswordRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: ResetPasswordResponse) => void): grpcWeb.ClientReadableStream<ResetPasswordResponse>;

  resetPassword(
    request: ResetPasswordRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: ResetPasswordResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        new URL('/percona.platform.auth.v1.AuthAPI/ResetPassword', this.hostname_).toString(),
        request,
        metadata || {},
        this.methodInfoResetPassword,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/percona.platform.auth.v1.AuthAPI/ResetPassword',
    request,
    metadata || {},
    this.methodInfoResetPassword);
  }

}

