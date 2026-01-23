#include "AppSealingInterfaceBridge.h"

@implementation AppSealingInterfaceBridge
RCT_EXPORT_MODULE()

// Check the device for flash capabilities and return callback of success // or fail
// sync version
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(IsAbnormalEnvironmentDetectedRN)
{
    RCTLogWarn(
        @"[AppSealing] IsAbnormalEnvironmentDetectedRN is deprecated. "
        @"Use IsAbnormalEnvironmentDetectedAsyncRN instead."
    );

    AppSealingInterface *inst = [[AppSealingInterface alloc] init];
    return [NSString stringWithFormat:@"%d", [inst _IsAbnormalEnvironmentDetected]];
}

// async version
RCT_EXPORT_METHOD( IsAbnormalEnvironmentDetectedAsyncRN:( RCTPromiseResolveBlock )resolve rejecter:( RCTPromiseRejectBlock )reject )
{
    // completion == resolve
    [[[AppSealingInterface alloc] init] _IsAbnormalEnvironmentDetectedAsync:^( int result )
    {
        @try
        {
            resolve( @( result ));   // JS: number
        }
        @catch( NSException *exception )
        {
            reject( @"APPSEALING_RESOLVE_EXCEPTION", exception.reason ?: @"Unknown exception", nil );
        }
    }];
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(IsSwizzlingDetectedReturnRN)
{
  return [NSString stringWithFormat:@"%d", [AppSealingInterface _ReturnSwizzlingDetected]];
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(GetAppSealingDeviceIDRN)
{
  AppSealingInterface *inst = [[AppSealingInterface alloc] init];
  return [NSString stringWithUTF8String:[inst _GetAppSealingDeviceID]];
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(GetEncryptedCredentialRN)
{
    RCTLogWarn(
        @"[AppSealing] GetEncryptedCredentialRN is deprecated. "
        @"Use GetEncryptedCredentialAsyncRN instead."
    );

  AppSealingInterface *inst = [[AppSealingInterface alloc] init];
  return [NSString stringWithUTF8String:[inst _GetEncryptedCredential]];
}

RCT_EXPORT_METHOD(GetEncryptedCredentialAsync:( RCTPromiseResolveBlock )resolve rejecter:( RCTPromiseRejectBlock )reject )
{
    AppSealingInterface *inst = [[AppSealingInterface alloc] init];

    [inst _GetEncryptedCredentialAsync:^( const char *result )
    {
        @try
        {
            if ( result )
            {
                // Convert C string to NSString safely
                NSString *credential = [NSString stringWithUTF8String:result] ?: @"";
                resolve( credential );
            }
            else
            {
                resolve( [NSNull null] );
            }
        }
        @catch( NSException *exception )
        {
            reject( @"APPSEALING_GET_CREDENTIAL_FAILED", exception.reason ?: @"Unknown exception", nil );
        }
    }];
}

RCT_EXPORT_METHOD(ExitApp)
{
    exit( 0 );
}
@end