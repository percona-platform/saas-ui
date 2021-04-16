/**
 * @fileoverview gRPC-Web generated client stub for percona.platform.auth.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as auth_auth_api_pb from '../auth/auth_api_pb';


export class AuthAPIClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoSignUp = new grpcWeb.AbstractClientBase.MethodInfo(
    auth_auth_api_pb.SignUpResponse,
    (request: auth_auth_api_pb.SignUpRequest) => {
      return request.serializeBinary();
    },
    auth_auth_api_pb.SignUpResponse.deserializeBinary
  );

  signUp(
    request: auth_auth_api_pb.SignUpRequest,
    metadata: grpcWeb.Metadata | null): Promise<auth_auth_api_pb.SignUpResponse>;

  signUp(
    request: auth_auth_api_pb.SignUpRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: auth_auth_api_pb.SignUpResponse) => void): grpcWeb.ClientReadableStream<auth_auth_api_pb.SignUpResponse>;

  signUp(
    request: auth_auth_api_pb.SignUpRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: auth_auth_api_pb.SignUpResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/percona.platform.auth.v1.AuthAPI/SignUp',
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
    auth_auth_api_pb.SignInResponse,
    (request: auth_auth_api_pb.SignInRequest) => {
      return request.serializeBinary();
    },
    auth_auth_api_pb.SignInResponse.deserializeBinary
  );

  signIn(
    request: auth_auth_api_pb.SignInRequest,
    metadata: grpcWeb.Metadata | null): Promise<auth_auth_api_pb.SignInResponse>;

  signIn(
    request: auth_auth_api_pb.SignInRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: auth_auth_api_pb.SignInResponse) => void): grpcWeb.ClientReadableStream<auth_auth_api_pb.SignInResponse>;

  signIn(
    request: auth_auth_api_pb.SignInRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: auth_auth_api_pb.SignInResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/percona.platform.auth.v1.AuthAPI/SignIn',
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
    auth_auth_api_pb.SignOutResponse,
    (request: auth_auth_api_pb.SignOutRequest) => {
      return request.serializeBinary();
    },
    auth_auth_api_pb.SignOutResponse.deserializeBinary
  );

  signOut(
    request: auth_auth_api_pb.SignOutRequest,
    metadata: grpcWeb.Metadata | null): Promise<auth_auth_api_pb.SignOutResponse>;

  signOut(
    request: auth_auth_api_pb.SignOutRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: auth_auth_api_pb.SignOutResponse) => void): grpcWeb.ClientReadableStream<auth_auth_api_pb.SignOutResponse>;

  signOut(
    request: auth_auth_api_pb.SignOutRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: auth_auth_api_pb.SignOutResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/percona.platform.auth.v1.AuthAPI/SignOut',
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
    auth_auth_api_pb.RefreshSessionResponse,
    (request: auth_auth_api_pb.RefreshSessionRequest) => {
      return request.serializeBinary();
    },
    auth_auth_api_pb.RefreshSessionResponse.deserializeBinary
  );

  refreshSession(
    request: auth_auth_api_pb.RefreshSessionRequest,
    metadata: grpcWeb.Metadata | null): Promise<auth_auth_api_pb.RefreshSessionResponse>;

  refreshSession(
    request: auth_auth_api_pb.RefreshSessionRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: auth_auth_api_pb.RefreshSessionResponse) => void): grpcWeb.ClientReadableStream<auth_auth_api_pb.RefreshSessionResponse>;

  refreshSession(
    request: auth_auth_api_pb.RefreshSessionRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: auth_auth_api_pb.RefreshSessionResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/percona.platform.auth.v1.AuthAPI/RefreshSession',
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
    auth_auth_api_pb.ResetPasswordResponse,
    (request: auth_auth_api_pb.ResetPasswordRequest) => {
      return request.serializeBinary();
    },
    auth_auth_api_pb.ResetPasswordResponse.deserializeBinary
  );

  resetPassword(
    request: auth_auth_api_pb.ResetPasswordRequest,
    metadata: grpcWeb.Metadata | null): Promise<auth_auth_api_pb.ResetPasswordResponse>;

  resetPassword(
    request: auth_auth_api_pb.ResetPasswordRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: auth_auth_api_pb.ResetPasswordResponse) => void): grpcWeb.ClientReadableStream<auth_auth_api_pb.ResetPasswordResponse>;

  resetPassword(
    request: auth_auth_api_pb.ResetPasswordRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: auth_auth_api_pb.ResetPasswordResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/percona.platform.auth.v1.AuthAPI/ResetPassword',
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

  methodInfoGetProfile = new grpcWeb.AbstractClientBase.MethodInfo(
    auth_auth_api_pb.GetProfileResponse,
    (request: auth_auth_api_pb.GetProfileRequest) => {
      return request.serializeBinary();
    },
    auth_auth_api_pb.GetProfileResponse.deserializeBinary
  );

  getProfile(
    request: auth_auth_api_pb.GetProfileRequest,
    metadata: grpcWeb.Metadata | null): Promise<auth_auth_api_pb.GetProfileResponse>;

  getProfile(
    request: auth_auth_api_pb.GetProfileRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: auth_auth_api_pb.GetProfileResponse) => void): grpcWeb.ClientReadableStream<auth_auth_api_pb.GetProfileResponse>;

  getProfile(
    request: auth_auth_api_pb.GetProfileRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: auth_auth_api_pb.GetProfileResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/percona.platform.auth.v1.AuthAPI/GetProfile',
        request,
        metadata || {},
        this.methodInfoGetProfile,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/percona.platform.auth.v1.AuthAPI/GetProfile',
    request,
    metadata || {},
    this.methodInfoGetProfile);
  }

}

