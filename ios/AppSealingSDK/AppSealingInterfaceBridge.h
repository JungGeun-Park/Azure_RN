#ifndef AppSealingInterfaceBridge__h
#define AppSealingInterfaceBridge__h

#import <Foundation/Foundation.h>
#import <AppSealingFramework/AppSealingFramework.h>

#if __has_include(<React/RCTAssert.h>)
#import <React/RCTBridgeModule.h>
#else
#import "RCTBridgeModule.h"
#endif

@interface AppSealingInterfaceBridge : NSObject <RCTBridgeModule>
@end

#endif /* AppSealingInterfaceBridge__h */