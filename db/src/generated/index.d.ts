
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model RewrapKey
 * 
 */
export type RewrapKey = $Result.DefaultSelection<Prisma.$RewrapKeyPayload>
/**
 * Model AccessLog
 * 
 */
export type AccessLog = $Result.DefaultSelection<Prisma.$AccessLogPayload>
/**
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>
/**
 * Model ConsentCredential
 * 
 */
export type ConsentCredential = $Result.DefaultSelection<Prisma.$ConsentCredentialPayload>
/**
 * Model RecordAnchor
 * 
 */
export type RecordAnchor = $Result.DefaultSelection<Prisma.$RecordAnchorPayload>
/**
 * Model AccessRequest
 * 
 */
export type AccessRequest = $Result.DefaultSelection<Prisma.$AccessRequestPayload>
/**
 * Model AuditEvent
 * 
 */
export type AuditEvent = $Result.DefaultSelection<Prisma.$AuditEventPayload>
/**
 * Model MerkleLeaf
 * 
 */
export type MerkleLeaf = $Result.DefaultSelection<Prisma.$MerkleLeafPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more RewrapKeys
 * const rewrapKeys = await prisma.rewrapKey.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more RewrapKeys
   * const rewrapKeys = await prisma.rewrapKey.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.rewrapKey`: Exposes CRUD operations for the **RewrapKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RewrapKeys
    * const rewrapKeys = await prisma.rewrapKey.findMany()
    * ```
    */
  get rewrapKey(): Prisma.RewrapKeyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.accessLog`: Exposes CRUD operations for the **AccessLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AccessLogs
    * const accessLogs = await prisma.accessLog.findMany()
    * ```
    */
  get accessLog(): Prisma.AccessLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.consentCredential`: Exposes CRUD operations for the **ConsentCredential** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ConsentCredentials
    * const consentCredentials = await prisma.consentCredential.findMany()
    * ```
    */
  get consentCredential(): Prisma.ConsentCredentialDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recordAnchor`: Exposes CRUD operations for the **RecordAnchor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RecordAnchors
    * const recordAnchors = await prisma.recordAnchor.findMany()
    * ```
    */
  get recordAnchor(): Prisma.RecordAnchorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.accessRequest`: Exposes CRUD operations for the **AccessRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AccessRequests
    * const accessRequests = await prisma.accessRequest.findMany()
    * ```
    */
  get accessRequest(): Prisma.AccessRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditEvent`: Exposes CRUD operations for the **AuditEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditEvents
    * const auditEvents = await prisma.auditEvent.findMany()
    * ```
    */
  get auditEvent(): Prisma.AuditEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.merkleLeaf`: Exposes CRUD operations for the **MerkleLeaf** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MerkleLeaves
    * const merkleLeaves = await prisma.merkleLeaf.findMany()
    * ```
    */
  get merkleLeaf(): Prisma.MerkleLeafDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.0.0
   * Query Engine version: 0c19ccc313cf9911a90d99d2ac2eb0280c76c513
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    RewrapKey: 'RewrapKey',
    AccessLog: 'AccessLog',
    Admin: 'Admin',
    ConsentCredential: 'ConsentCredential',
    RecordAnchor: 'RecordAnchor',
    AccessRequest: 'AccessRequest',
    AuditEvent: 'AuditEvent',
    MerkleLeaf: 'MerkleLeaf'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "rewrapKey" | "accessLog" | "admin" | "consentCredential" | "recordAnchor" | "accessRequest" | "auditEvent" | "merkleLeaf"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      RewrapKey: {
        payload: Prisma.$RewrapKeyPayload<ExtArgs>
        fields: Prisma.RewrapKeyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RewrapKeyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewrapKeyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RewrapKeyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewrapKeyPayload>
          }
          findFirst: {
            args: Prisma.RewrapKeyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewrapKeyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RewrapKeyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewrapKeyPayload>
          }
          findMany: {
            args: Prisma.RewrapKeyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewrapKeyPayload>[]
          }
          create: {
            args: Prisma.RewrapKeyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewrapKeyPayload>
          }
          createMany: {
            args: Prisma.RewrapKeyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RewrapKeyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewrapKeyPayload>[]
          }
          delete: {
            args: Prisma.RewrapKeyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewrapKeyPayload>
          }
          update: {
            args: Prisma.RewrapKeyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewrapKeyPayload>
          }
          deleteMany: {
            args: Prisma.RewrapKeyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RewrapKeyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RewrapKeyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewrapKeyPayload>[]
          }
          upsert: {
            args: Prisma.RewrapKeyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewrapKeyPayload>
          }
          aggregate: {
            args: Prisma.RewrapKeyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRewrapKey>
          }
          groupBy: {
            args: Prisma.RewrapKeyGroupByArgs<ExtArgs>
            result: $Utils.Optional<RewrapKeyGroupByOutputType>[]
          }
          count: {
            args: Prisma.RewrapKeyCountArgs<ExtArgs>
            result: $Utils.Optional<RewrapKeyCountAggregateOutputType> | number
          }
        }
      }
      AccessLog: {
        payload: Prisma.$AccessLogPayload<ExtArgs>
        fields: Prisma.AccessLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccessLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccessLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLogPayload>
          }
          findFirst: {
            args: Prisma.AccessLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccessLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLogPayload>
          }
          findMany: {
            args: Prisma.AccessLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLogPayload>[]
          }
          create: {
            args: Prisma.AccessLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLogPayload>
          }
          createMany: {
            args: Prisma.AccessLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccessLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLogPayload>[]
          }
          delete: {
            args: Prisma.AccessLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLogPayload>
          }
          update: {
            args: Prisma.AccessLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLogPayload>
          }
          deleteMany: {
            args: Prisma.AccessLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccessLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccessLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLogPayload>[]
          }
          upsert: {
            args: Prisma.AccessLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLogPayload>
          }
          aggregate: {
            args: Prisma.AccessLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccessLog>
          }
          groupBy: {
            args: Prisma.AccessLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccessLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccessLogCountArgs<ExtArgs>
            result: $Utils.Optional<AccessLogCountAggregateOutputType> | number
          }
        }
      }
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      ConsentCredential: {
        payload: Prisma.$ConsentCredentialPayload<ExtArgs>
        fields: Prisma.ConsentCredentialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConsentCredentialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentCredentialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConsentCredentialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentCredentialPayload>
          }
          findFirst: {
            args: Prisma.ConsentCredentialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentCredentialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConsentCredentialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentCredentialPayload>
          }
          findMany: {
            args: Prisma.ConsentCredentialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentCredentialPayload>[]
          }
          create: {
            args: Prisma.ConsentCredentialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentCredentialPayload>
          }
          createMany: {
            args: Prisma.ConsentCredentialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConsentCredentialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentCredentialPayload>[]
          }
          delete: {
            args: Prisma.ConsentCredentialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentCredentialPayload>
          }
          update: {
            args: Prisma.ConsentCredentialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentCredentialPayload>
          }
          deleteMany: {
            args: Prisma.ConsentCredentialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConsentCredentialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConsentCredentialUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentCredentialPayload>[]
          }
          upsert: {
            args: Prisma.ConsentCredentialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentCredentialPayload>
          }
          aggregate: {
            args: Prisma.ConsentCredentialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConsentCredential>
          }
          groupBy: {
            args: Prisma.ConsentCredentialGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConsentCredentialGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConsentCredentialCountArgs<ExtArgs>
            result: $Utils.Optional<ConsentCredentialCountAggregateOutputType> | number
          }
        }
      }
      RecordAnchor: {
        payload: Prisma.$RecordAnchorPayload<ExtArgs>
        fields: Prisma.RecordAnchorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecordAnchorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordAnchorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecordAnchorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordAnchorPayload>
          }
          findFirst: {
            args: Prisma.RecordAnchorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordAnchorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecordAnchorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordAnchorPayload>
          }
          findMany: {
            args: Prisma.RecordAnchorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordAnchorPayload>[]
          }
          create: {
            args: Prisma.RecordAnchorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordAnchorPayload>
          }
          createMany: {
            args: Prisma.RecordAnchorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecordAnchorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordAnchorPayload>[]
          }
          delete: {
            args: Prisma.RecordAnchorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordAnchorPayload>
          }
          update: {
            args: Prisma.RecordAnchorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordAnchorPayload>
          }
          deleteMany: {
            args: Prisma.RecordAnchorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecordAnchorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecordAnchorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordAnchorPayload>[]
          }
          upsert: {
            args: Prisma.RecordAnchorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordAnchorPayload>
          }
          aggregate: {
            args: Prisma.RecordAnchorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecordAnchor>
          }
          groupBy: {
            args: Prisma.RecordAnchorGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecordAnchorGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecordAnchorCountArgs<ExtArgs>
            result: $Utils.Optional<RecordAnchorCountAggregateOutputType> | number
          }
        }
      }
      AccessRequest: {
        payload: Prisma.$AccessRequestPayload<ExtArgs>
        fields: Prisma.AccessRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccessRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccessRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessRequestPayload>
          }
          findFirst: {
            args: Prisma.AccessRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccessRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessRequestPayload>
          }
          findMany: {
            args: Prisma.AccessRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessRequestPayload>[]
          }
          create: {
            args: Prisma.AccessRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessRequestPayload>
          }
          createMany: {
            args: Prisma.AccessRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccessRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessRequestPayload>[]
          }
          delete: {
            args: Prisma.AccessRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessRequestPayload>
          }
          update: {
            args: Prisma.AccessRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessRequestPayload>
          }
          deleteMany: {
            args: Prisma.AccessRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccessRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccessRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessRequestPayload>[]
          }
          upsert: {
            args: Prisma.AccessRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessRequestPayload>
          }
          aggregate: {
            args: Prisma.AccessRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccessRequest>
          }
          groupBy: {
            args: Prisma.AccessRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccessRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccessRequestCountArgs<ExtArgs>
            result: $Utils.Optional<AccessRequestCountAggregateOutputType> | number
          }
        }
      }
      AuditEvent: {
        payload: Prisma.$AuditEventPayload<ExtArgs>
        fields: Prisma.AuditEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>
          }
          findFirst: {
            args: Prisma.AuditEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>
          }
          findMany: {
            args: Prisma.AuditEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>[]
          }
          create: {
            args: Prisma.AuditEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>
          }
          createMany: {
            args: Prisma.AuditEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>[]
          }
          delete: {
            args: Prisma.AuditEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>
          }
          update: {
            args: Prisma.AuditEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>
          }
          deleteMany: {
            args: Prisma.AuditEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>[]
          }
          upsert: {
            args: Prisma.AuditEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>
          }
          aggregate: {
            args: Prisma.AuditEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditEvent>
          }
          groupBy: {
            args: Prisma.AuditEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditEventCountArgs<ExtArgs>
            result: $Utils.Optional<AuditEventCountAggregateOutputType> | number
          }
        }
      }
      MerkleLeaf: {
        payload: Prisma.$MerkleLeafPayload<ExtArgs>
        fields: Prisma.MerkleLeafFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MerkleLeafFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerkleLeafPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MerkleLeafFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerkleLeafPayload>
          }
          findFirst: {
            args: Prisma.MerkleLeafFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerkleLeafPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MerkleLeafFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerkleLeafPayload>
          }
          findMany: {
            args: Prisma.MerkleLeafFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerkleLeafPayload>[]
          }
          create: {
            args: Prisma.MerkleLeafCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerkleLeafPayload>
          }
          createMany: {
            args: Prisma.MerkleLeafCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MerkleLeafCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerkleLeafPayload>[]
          }
          delete: {
            args: Prisma.MerkleLeafDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerkleLeafPayload>
          }
          update: {
            args: Prisma.MerkleLeafUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerkleLeafPayload>
          }
          deleteMany: {
            args: Prisma.MerkleLeafDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MerkleLeafUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MerkleLeafUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerkleLeafPayload>[]
          }
          upsert: {
            args: Prisma.MerkleLeafUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MerkleLeafPayload>
          }
          aggregate: {
            args: Prisma.MerkleLeafAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMerkleLeaf>
          }
          groupBy: {
            args: Prisma.MerkleLeafGroupByArgs<ExtArgs>
            result: $Utils.Optional<MerkleLeafGroupByOutputType>[]
          }
          count: {
            args: Prisma.MerkleLeafCountArgs<ExtArgs>
            result: $Utils.Optional<MerkleLeafCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    rewrapKey?: RewrapKeyOmit
    accessLog?: AccessLogOmit
    admin?: AdminOmit
    consentCredential?: ConsentCredentialOmit
    recordAnchor?: RecordAnchorOmit
    accessRequest?: AccessRequestOmit
    auditEvent?: AuditEventOmit
    merkleLeaf?: MerkleLeafOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type RewrapKeyCountOutputType
   */

  export type RewrapKeyCountOutputType = {
    accessLogs: number
  }

  export type RewrapKeyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accessLogs?: boolean | RewrapKeyCountOutputTypeCountAccessLogsArgs
  }

  // Custom InputTypes
  /**
   * RewrapKeyCountOutputType without action
   */
  export type RewrapKeyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrapKeyCountOutputType
     */
    select?: RewrapKeyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RewrapKeyCountOutputType without action
   */
  export type RewrapKeyCountOutputTypeCountAccessLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccessLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model RewrapKey
   */

  export type AggregateRewrapKey = {
    _count: RewrapKeyCountAggregateOutputType | null
    _avg: RewrapKeyAvgAggregateOutputType | null
    _sum: RewrapKeySumAggregateOutputType | null
    _min: RewrapKeyMinAggregateOutputType | null
    _max: RewrapKeyMaxAggregateOutputType | null
  }

  export type RewrapKeyAvgAggregateOutputType = {
    id: number | null
    accessCount: number | null
  }

  export type RewrapKeySumAggregateOutputType = {
    id: number | null
    accessCount: number | null
  }

  export type RewrapKeyMinAggregateOutputType = {
    id: number | null
    recordCid: string | null
    recipientPubkey: string | null
    encryptedSymKey: string | null
    creatorPubkey: string | null
    createdAt: Date | null
    expiresAt: Date | null
    accessCount: number | null
    lastAccessedAt: Date | null
  }

  export type RewrapKeyMaxAggregateOutputType = {
    id: number | null
    recordCid: string | null
    recipientPubkey: string | null
    encryptedSymKey: string | null
    creatorPubkey: string | null
    createdAt: Date | null
    expiresAt: Date | null
    accessCount: number | null
    lastAccessedAt: Date | null
  }

  export type RewrapKeyCountAggregateOutputType = {
    id: number
    recordCid: number
    recipientPubkey: number
    encryptedSymKey: number
    creatorPubkey: number
    createdAt: number
    expiresAt: number
    accessCount: number
    lastAccessedAt: number
    _all: number
  }


  export type RewrapKeyAvgAggregateInputType = {
    id?: true
    accessCount?: true
  }

  export type RewrapKeySumAggregateInputType = {
    id?: true
    accessCount?: true
  }

  export type RewrapKeyMinAggregateInputType = {
    id?: true
    recordCid?: true
    recipientPubkey?: true
    encryptedSymKey?: true
    creatorPubkey?: true
    createdAt?: true
    expiresAt?: true
    accessCount?: true
    lastAccessedAt?: true
  }

  export type RewrapKeyMaxAggregateInputType = {
    id?: true
    recordCid?: true
    recipientPubkey?: true
    encryptedSymKey?: true
    creatorPubkey?: true
    createdAt?: true
    expiresAt?: true
    accessCount?: true
    lastAccessedAt?: true
  }

  export type RewrapKeyCountAggregateInputType = {
    id?: true
    recordCid?: true
    recipientPubkey?: true
    encryptedSymKey?: true
    creatorPubkey?: true
    createdAt?: true
    expiresAt?: true
    accessCount?: true
    lastAccessedAt?: true
    _all?: true
  }

  export type RewrapKeyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RewrapKey to aggregate.
     */
    where?: RewrapKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RewrapKeys to fetch.
     */
    orderBy?: RewrapKeyOrderByWithRelationInput | RewrapKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RewrapKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RewrapKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RewrapKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RewrapKeys
    **/
    _count?: true | RewrapKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RewrapKeyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RewrapKeySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RewrapKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RewrapKeyMaxAggregateInputType
  }

  export type GetRewrapKeyAggregateType<T extends RewrapKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateRewrapKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRewrapKey[P]>
      : GetScalarType<T[P], AggregateRewrapKey[P]>
  }




  export type RewrapKeyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RewrapKeyWhereInput
    orderBy?: RewrapKeyOrderByWithAggregationInput | RewrapKeyOrderByWithAggregationInput[]
    by: RewrapKeyScalarFieldEnum[] | RewrapKeyScalarFieldEnum
    having?: RewrapKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RewrapKeyCountAggregateInputType | true
    _avg?: RewrapKeyAvgAggregateInputType
    _sum?: RewrapKeySumAggregateInputType
    _min?: RewrapKeyMinAggregateInputType
    _max?: RewrapKeyMaxAggregateInputType
  }

  export type RewrapKeyGroupByOutputType = {
    id: number
    recordCid: string
    recipientPubkey: string
    encryptedSymKey: string
    creatorPubkey: string | null
    createdAt: Date
    expiresAt: Date | null
    accessCount: number
    lastAccessedAt: Date | null
    _count: RewrapKeyCountAggregateOutputType | null
    _avg: RewrapKeyAvgAggregateOutputType | null
    _sum: RewrapKeySumAggregateOutputType | null
    _min: RewrapKeyMinAggregateOutputType | null
    _max: RewrapKeyMaxAggregateOutputType | null
  }

  type GetRewrapKeyGroupByPayload<T extends RewrapKeyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RewrapKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RewrapKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RewrapKeyGroupByOutputType[P]>
            : GetScalarType<T[P], RewrapKeyGroupByOutputType[P]>
        }
      >
    >


  export type RewrapKeySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    recordCid?: boolean
    recipientPubkey?: boolean
    encryptedSymKey?: boolean
    creatorPubkey?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    accessCount?: boolean
    lastAccessedAt?: boolean
    accessLogs?: boolean | RewrapKey$accessLogsArgs<ExtArgs>
    _count?: boolean | RewrapKeyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rewrapKey"]>

  export type RewrapKeySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    recordCid?: boolean
    recipientPubkey?: boolean
    encryptedSymKey?: boolean
    creatorPubkey?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    accessCount?: boolean
    lastAccessedAt?: boolean
  }, ExtArgs["result"]["rewrapKey"]>

  export type RewrapKeySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    recordCid?: boolean
    recipientPubkey?: boolean
    encryptedSymKey?: boolean
    creatorPubkey?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    accessCount?: boolean
    lastAccessedAt?: boolean
  }, ExtArgs["result"]["rewrapKey"]>

  export type RewrapKeySelectScalar = {
    id?: boolean
    recordCid?: boolean
    recipientPubkey?: boolean
    encryptedSymKey?: boolean
    creatorPubkey?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    accessCount?: boolean
    lastAccessedAt?: boolean
  }

  export type RewrapKeyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "recordCid" | "recipientPubkey" | "encryptedSymKey" | "creatorPubkey" | "createdAt" | "expiresAt" | "accessCount" | "lastAccessedAt", ExtArgs["result"]["rewrapKey"]>
  export type RewrapKeyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accessLogs?: boolean | RewrapKey$accessLogsArgs<ExtArgs>
    _count?: boolean | RewrapKeyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RewrapKeyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RewrapKeyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RewrapKeyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RewrapKey"
    objects: {
      accessLogs: Prisma.$AccessLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      recordCid: string
      recipientPubkey: string
      encryptedSymKey: string
      creatorPubkey: string | null
      createdAt: Date
      expiresAt: Date | null
      accessCount: number
      lastAccessedAt: Date | null
    }, ExtArgs["result"]["rewrapKey"]>
    composites: {}
  }

  type RewrapKeyGetPayload<S extends boolean | null | undefined | RewrapKeyDefaultArgs> = $Result.GetResult<Prisma.$RewrapKeyPayload, S>

  type RewrapKeyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RewrapKeyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RewrapKeyCountAggregateInputType | true
    }

  export interface RewrapKeyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RewrapKey'], meta: { name: 'RewrapKey' } }
    /**
     * Find zero or one RewrapKey that matches the filter.
     * @param {RewrapKeyFindUniqueArgs} args - Arguments to find a RewrapKey
     * @example
     * // Get one RewrapKey
     * const rewrapKey = await prisma.rewrapKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RewrapKeyFindUniqueArgs>(args: SelectSubset<T, RewrapKeyFindUniqueArgs<ExtArgs>>): Prisma__RewrapKeyClient<$Result.GetResult<Prisma.$RewrapKeyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RewrapKey that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RewrapKeyFindUniqueOrThrowArgs} args - Arguments to find a RewrapKey
     * @example
     * // Get one RewrapKey
     * const rewrapKey = await prisma.rewrapKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RewrapKeyFindUniqueOrThrowArgs>(args: SelectSubset<T, RewrapKeyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RewrapKeyClient<$Result.GetResult<Prisma.$RewrapKeyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RewrapKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewrapKeyFindFirstArgs} args - Arguments to find a RewrapKey
     * @example
     * // Get one RewrapKey
     * const rewrapKey = await prisma.rewrapKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RewrapKeyFindFirstArgs>(args?: SelectSubset<T, RewrapKeyFindFirstArgs<ExtArgs>>): Prisma__RewrapKeyClient<$Result.GetResult<Prisma.$RewrapKeyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RewrapKey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewrapKeyFindFirstOrThrowArgs} args - Arguments to find a RewrapKey
     * @example
     * // Get one RewrapKey
     * const rewrapKey = await prisma.rewrapKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RewrapKeyFindFirstOrThrowArgs>(args?: SelectSubset<T, RewrapKeyFindFirstOrThrowArgs<ExtArgs>>): Prisma__RewrapKeyClient<$Result.GetResult<Prisma.$RewrapKeyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RewrapKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewrapKeyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RewrapKeys
     * const rewrapKeys = await prisma.rewrapKey.findMany()
     * 
     * // Get first 10 RewrapKeys
     * const rewrapKeys = await prisma.rewrapKey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rewrapKeyWithIdOnly = await prisma.rewrapKey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RewrapKeyFindManyArgs>(args?: SelectSubset<T, RewrapKeyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RewrapKeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RewrapKey.
     * @param {RewrapKeyCreateArgs} args - Arguments to create a RewrapKey.
     * @example
     * // Create one RewrapKey
     * const RewrapKey = await prisma.rewrapKey.create({
     *   data: {
     *     // ... data to create a RewrapKey
     *   }
     * })
     * 
     */
    create<T extends RewrapKeyCreateArgs>(args: SelectSubset<T, RewrapKeyCreateArgs<ExtArgs>>): Prisma__RewrapKeyClient<$Result.GetResult<Prisma.$RewrapKeyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RewrapKeys.
     * @param {RewrapKeyCreateManyArgs} args - Arguments to create many RewrapKeys.
     * @example
     * // Create many RewrapKeys
     * const rewrapKey = await prisma.rewrapKey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RewrapKeyCreateManyArgs>(args?: SelectSubset<T, RewrapKeyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RewrapKeys and returns the data saved in the database.
     * @param {RewrapKeyCreateManyAndReturnArgs} args - Arguments to create many RewrapKeys.
     * @example
     * // Create many RewrapKeys
     * const rewrapKey = await prisma.rewrapKey.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RewrapKeys and only return the `id`
     * const rewrapKeyWithIdOnly = await prisma.rewrapKey.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RewrapKeyCreateManyAndReturnArgs>(args?: SelectSubset<T, RewrapKeyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RewrapKeyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RewrapKey.
     * @param {RewrapKeyDeleteArgs} args - Arguments to delete one RewrapKey.
     * @example
     * // Delete one RewrapKey
     * const RewrapKey = await prisma.rewrapKey.delete({
     *   where: {
     *     // ... filter to delete one RewrapKey
     *   }
     * })
     * 
     */
    delete<T extends RewrapKeyDeleteArgs>(args: SelectSubset<T, RewrapKeyDeleteArgs<ExtArgs>>): Prisma__RewrapKeyClient<$Result.GetResult<Prisma.$RewrapKeyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RewrapKey.
     * @param {RewrapKeyUpdateArgs} args - Arguments to update one RewrapKey.
     * @example
     * // Update one RewrapKey
     * const rewrapKey = await prisma.rewrapKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RewrapKeyUpdateArgs>(args: SelectSubset<T, RewrapKeyUpdateArgs<ExtArgs>>): Prisma__RewrapKeyClient<$Result.GetResult<Prisma.$RewrapKeyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RewrapKeys.
     * @param {RewrapKeyDeleteManyArgs} args - Arguments to filter RewrapKeys to delete.
     * @example
     * // Delete a few RewrapKeys
     * const { count } = await prisma.rewrapKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RewrapKeyDeleteManyArgs>(args?: SelectSubset<T, RewrapKeyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RewrapKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewrapKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RewrapKeys
     * const rewrapKey = await prisma.rewrapKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RewrapKeyUpdateManyArgs>(args: SelectSubset<T, RewrapKeyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RewrapKeys and returns the data updated in the database.
     * @param {RewrapKeyUpdateManyAndReturnArgs} args - Arguments to update many RewrapKeys.
     * @example
     * // Update many RewrapKeys
     * const rewrapKey = await prisma.rewrapKey.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RewrapKeys and only return the `id`
     * const rewrapKeyWithIdOnly = await prisma.rewrapKey.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RewrapKeyUpdateManyAndReturnArgs>(args: SelectSubset<T, RewrapKeyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RewrapKeyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RewrapKey.
     * @param {RewrapKeyUpsertArgs} args - Arguments to update or create a RewrapKey.
     * @example
     * // Update or create a RewrapKey
     * const rewrapKey = await prisma.rewrapKey.upsert({
     *   create: {
     *     // ... data to create a RewrapKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RewrapKey we want to update
     *   }
     * })
     */
    upsert<T extends RewrapKeyUpsertArgs>(args: SelectSubset<T, RewrapKeyUpsertArgs<ExtArgs>>): Prisma__RewrapKeyClient<$Result.GetResult<Prisma.$RewrapKeyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RewrapKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewrapKeyCountArgs} args - Arguments to filter RewrapKeys to count.
     * @example
     * // Count the number of RewrapKeys
     * const count = await prisma.rewrapKey.count({
     *   where: {
     *     // ... the filter for the RewrapKeys we want to count
     *   }
     * })
    **/
    count<T extends RewrapKeyCountArgs>(
      args?: Subset<T, RewrapKeyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RewrapKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RewrapKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewrapKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RewrapKeyAggregateArgs>(args: Subset<T, RewrapKeyAggregateArgs>): Prisma.PrismaPromise<GetRewrapKeyAggregateType<T>>

    /**
     * Group by RewrapKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewrapKeyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RewrapKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RewrapKeyGroupByArgs['orderBy'] }
        : { orderBy?: RewrapKeyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RewrapKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRewrapKeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RewrapKey model
   */
  readonly fields: RewrapKeyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RewrapKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RewrapKeyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accessLogs<T extends RewrapKey$accessLogsArgs<ExtArgs> = {}>(args?: Subset<T, RewrapKey$accessLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RewrapKey model
   */
  interface RewrapKeyFieldRefs {
    readonly id: FieldRef<"RewrapKey", 'Int'>
    readonly recordCid: FieldRef<"RewrapKey", 'String'>
    readonly recipientPubkey: FieldRef<"RewrapKey", 'String'>
    readonly encryptedSymKey: FieldRef<"RewrapKey", 'String'>
    readonly creatorPubkey: FieldRef<"RewrapKey", 'String'>
    readonly createdAt: FieldRef<"RewrapKey", 'DateTime'>
    readonly expiresAt: FieldRef<"RewrapKey", 'DateTime'>
    readonly accessCount: FieldRef<"RewrapKey", 'Int'>
    readonly lastAccessedAt: FieldRef<"RewrapKey", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RewrapKey findUnique
   */
  export type RewrapKeyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrapKey
     */
    select?: RewrapKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewrapKey
     */
    omit?: RewrapKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrapKeyInclude<ExtArgs> | null
    /**
     * Filter, which RewrapKey to fetch.
     */
    where: RewrapKeyWhereUniqueInput
  }

  /**
   * RewrapKey findUniqueOrThrow
   */
  export type RewrapKeyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrapKey
     */
    select?: RewrapKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewrapKey
     */
    omit?: RewrapKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrapKeyInclude<ExtArgs> | null
    /**
     * Filter, which RewrapKey to fetch.
     */
    where: RewrapKeyWhereUniqueInput
  }

  /**
   * RewrapKey findFirst
   */
  export type RewrapKeyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrapKey
     */
    select?: RewrapKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewrapKey
     */
    omit?: RewrapKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrapKeyInclude<ExtArgs> | null
    /**
     * Filter, which RewrapKey to fetch.
     */
    where?: RewrapKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RewrapKeys to fetch.
     */
    orderBy?: RewrapKeyOrderByWithRelationInput | RewrapKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RewrapKeys.
     */
    cursor?: RewrapKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RewrapKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RewrapKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RewrapKeys.
     */
    distinct?: RewrapKeyScalarFieldEnum | RewrapKeyScalarFieldEnum[]
  }

  /**
   * RewrapKey findFirstOrThrow
   */
  export type RewrapKeyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrapKey
     */
    select?: RewrapKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewrapKey
     */
    omit?: RewrapKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrapKeyInclude<ExtArgs> | null
    /**
     * Filter, which RewrapKey to fetch.
     */
    where?: RewrapKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RewrapKeys to fetch.
     */
    orderBy?: RewrapKeyOrderByWithRelationInput | RewrapKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RewrapKeys.
     */
    cursor?: RewrapKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RewrapKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RewrapKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RewrapKeys.
     */
    distinct?: RewrapKeyScalarFieldEnum | RewrapKeyScalarFieldEnum[]
  }

  /**
   * RewrapKey findMany
   */
  export type RewrapKeyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrapKey
     */
    select?: RewrapKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewrapKey
     */
    omit?: RewrapKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrapKeyInclude<ExtArgs> | null
    /**
     * Filter, which RewrapKeys to fetch.
     */
    where?: RewrapKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RewrapKeys to fetch.
     */
    orderBy?: RewrapKeyOrderByWithRelationInput | RewrapKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RewrapKeys.
     */
    cursor?: RewrapKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RewrapKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RewrapKeys.
     */
    skip?: number
    distinct?: RewrapKeyScalarFieldEnum | RewrapKeyScalarFieldEnum[]
  }

  /**
   * RewrapKey create
   */
  export type RewrapKeyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrapKey
     */
    select?: RewrapKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewrapKey
     */
    omit?: RewrapKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrapKeyInclude<ExtArgs> | null
    /**
     * The data needed to create a RewrapKey.
     */
    data: XOR<RewrapKeyCreateInput, RewrapKeyUncheckedCreateInput>
  }

  /**
   * RewrapKey createMany
   */
  export type RewrapKeyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RewrapKeys.
     */
    data: RewrapKeyCreateManyInput | RewrapKeyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RewrapKey createManyAndReturn
   */
  export type RewrapKeyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrapKey
     */
    select?: RewrapKeySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RewrapKey
     */
    omit?: RewrapKeyOmit<ExtArgs> | null
    /**
     * The data used to create many RewrapKeys.
     */
    data: RewrapKeyCreateManyInput | RewrapKeyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RewrapKey update
   */
  export type RewrapKeyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrapKey
     */
    select?: RewrapKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewrapKey
     */
    omit?: RewrapKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrapKeyInclude<ExtArgs> | null
    /**
     * The data needed to update a RewrapKey.
     */
    data: XOR<RewrapKeyUpdateInput, RewrapKeyUncheckedUpdateInput>
    /**
     * Choose, which RewrapKey to update.
     */
    where: RewrapKeyWhereUniqueInput
  }

  /**
   * RewrapKey updateMany
   */
  export type RewrapKeyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RewrapKeys.
     */
    data: XOR<RewrapKeyUpdateManyMutationInput, RewrapKeyUncheckedUpdateManyInput>
    /**
     * Filter which RewrapKeys to update
     */
    where?: RewrapKeyWhereInput
    /**
     * Limit how many RewrapKeys to update.
     */
    limit?: number
  }

  /**
   * RewrapKey updateManyAndReturn
   */
  export type RewrapKeyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrapKey
     */
    select?: RewrapKeySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RewrapKey
     */
    omit?: RewrapKeyOmit<ExtArgs> | null
    /**
     * The data used to update RewrapKeys.
     */
    data: XOR<RewrapKeyUpdateManyMutationInput, RewrapKeyUncheckedUpdateManyInput>
    /**
     * Filter which RewrapKeys to update
     */
    where?: RewrapKeyWhereInput
    /**
     * Limit how many RewrapKeys to update.
     */
    limit?: number
  }

  /**
   * RewrapKey upsert
   */
  export type RewrapKeyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrapKey
     */
    select?: RewrapKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewrapKey
     */
    omit?: RewrapKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrapKeyInclude<ExtArgs> | null
    /**
     * The filter to search for the RewrapKey to update in case it exists.
     */
    where: RewrapKeyWhereUniqueInput
    /**
     * In case the RewrapKey found by the `where` argument doesn't exist, create a new RewrapKey with this data.
     */
    create: XOR<RewrapKeyCreateInput, RewrapKeyUncheckedCreateInput>
    /**
     * In case the RewrapKey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RewrapKeyUpdateInput, RewrapKeyUncheckedUpdateInput>
  }

  /**
   * RewrapKey delete
   */
  export type RewrapKeyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrapKey
     */
    select?: RewrapKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewrapKey
     */
    omit?: RewrapKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrapKeyInclude<ExtArgs> | null
    /**
     * Filter which RewrapKey to delete.
     */
    where: RewrapKeyWhereUniqueInput
  }

  /**
   * RewrapKey deleteMany
   */
  export type RewrapKeyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RewrapKeys to delete
     */
    where?: RewrapKeyWhereInput
    /**
     * Limit how many RewrapKeys to delete.
     */
    limit?: number
  }

  /**
   * RewrapKey.accessLogs
   */
  export type RewrapKey$accessLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogInclude<ExtArgs> | null
    where?: AccessLogWhereInput
    orderBy?: AccessLogOrderByWithRelationInput | AccessLogOrderByWithRelationInput[]
    cursor?: AccessLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccessLogScalarFieldEnum | AccessLogScalarFieldEnum[]
  }

  /**
   * RewrapKey without action
   */
  export type RewrapKeyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrapKey
     */
    select?: RewrapKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewrapKey
     */
    omit?: RewrapKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrapKeyInclude<ExtArgs> | null
  }


  /**
   * Model AccessLog
   */

  export type AggregateAccessLog = {
    _count: AccessLogCountAggregateOutputType | null
    _avg: AccessLogAvgAggregateOutputType | null
    _sum: AccessLogSumAggregateOutputType | null
    _min: AccessLogMinAggregateOutputType | null
    _max: AccessLogMaxAggregateOutputType | null
  }

  export type AccessLogAvgAggregateOutputType = {
    id: number | null
    rewrapKeyId: number | null
  }

  export type AccessLogSumAggregateOutputType = {
    id: number | null
    rewrapKeyId: number | null
  }

  export type AccessLogMinAggregateOutputType = {
    id: number | null
    recordCid: string | null
    recipientPubkey: string | null
    rewrapKeyId: number | null
    success: boolean | null
    ipAddress: string | null
    userAgent: string | null
    errorMessage: string | null
    accessedAt: Date | null
  }

  export type AccessLogMaxAggregateOutputType = {
    id: number | null
    recordCid: string | null
    recipientPubkey: string | null
    rewrapKeyId: number | null
    success: boolean | null
    ipAddress: string | null
    userAgent: string | null
    errorMessage: string | null
    accessedAt: Date | null
  }

  export type AccessLogCountAggregateOutputType = {
    id: number
    recordCid: number
    recipientPubkey: number
    rewrapKeyId: number
    success: number
    ipAddress: number
    userAgent: number
    errorMessage: number
    accessedAt: number
    _all: number
  }


  export type AccessLogAvgAggregateInputType = {
    id?: true
    rewrapKeyId?: true
  }

  export type AccessLogSumAggregateInputType = {
    id?: true
    rewrapKeyId?: true
  }

  export type AccessLogMinAggregateInputType = {
    id?: true
    recordCid?: true
    recipientPubkey?: true
    rewrapKeyId?: true
    success?: true
    ipAddress?: true
    userAgent?: true
    errorMessage?: true
    accessedAt?: true
  }

  export type AccessLogMaxAggregateInputType = {
    id?: true
    recordCid?: true
    recipientPubkey?: true
    rewrapKeyId?: true
    success?: true
    ipAddress?: true
    userAgent?: true
    errorMessage?: true
    accessedAt?: true
  }

  export type AccessLogCountAggregateInputType = {
    id?: true
    recordCid?: true
    recipientPubkey?: true
    rewrapKeyId?: true
    success?: true
    ipAddress?: true
    userAgent?: true
    errorMessage?: true
    accessedAt?: true
    _all?: true
  }

  export type AccessLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AccessLog to aggregate.
     */
    where?: AccessLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessLogs to fetch.
     */
    orderBy?: AccessLogOrderByWithRelationInput | AccessLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccessLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AccessLogs
    **/
    _count?: true | AccessLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccessLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccessLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccessLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccessLogMaxAggregateInputType
  }

  export type GetAccessLogAggregateType<T extends AccessLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAccessLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccessLog[P]>
      : GetScalarType<T[P], AggregateAccessLog[P]>
  }




  export type AccessLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccessLogWhereInput
    orderBy?: AccessLogOrderByWithAggregationInput | AccessLogOrderByWithAggregationInput[]
    by: AccessLogScalarFieldEnum[] | AccessLogScalarFieldEnum
    having?: AccessLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccessLogCountAggregateInputType | true
    _avg?: AccessLogAvgAggregateInputType
    _sum?: AccessLogSumAggregateInputType
    _min?: AccessLogMinAggregateInputType
    _max?: AccessLogMaxAggregateInputType
  }

  export type AccessLogGroupByOutputType = {
    id: number
    recordCid: string
    recipientPubkey: string
    rewrapKeyId: number | null
    success: boolean
    ipAddress: string | null
    userAgent: string | null
    errorMessage: string | null
    accessedAt: Date
    _count: AccessLogCountAggregateOutputType | null
    _avg: AccessLogAvgAggregateOutputType | null
    _sum: AccessLogSumAggregateOutputType | null
    _min: AccessLogMinAggregateOutputType | null
    _max: AccessLogMaxAggregateOutputType | null
  }

  type GetAccessLogGroupByPayload<T extends AccessLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccessLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccessLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccessLogGroupByOutputType[P]>
            : GetScalarType<T[P], AccessLogGroupByOutputType[P]>
        }
      >
    >


  export type AccessLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    recordCid?: boolean
    recipientPubkey?: boolean
    rewrapKeyId?: boolean
    success?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    errorMessage?: boolean
    accessedAt?: boolean
    rewrapKey?: boolean | AccessLog$rewrapKeyArgs<ExtArgs>
  }, ExtArgs["result"]["accessLog"]>

  export type AccessLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    recordCid?: boolean
    recipientPubkey?: boolean
    rewrapKeyId?: boolean
    success?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    errorMessage?: boolean
    accessedAt?: boolean
    rewrapKey?: boolean | AccessLog$rewrapKeyArgs<ExtArgs>
  }, ExtArgs["result"]["accessLog"]>

  export type AccessLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    recordCid?: boolean
    recipientPubkey?: boolean
    rewrapKeyId?: boolean
    success?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    errorMessage?: boolean
    accessedAt?: boolean
    rewrapKey?: boolean | AccessLog$rewrapKeyArgs<ExtArgs>
  }, ExtArgs["result"]["accessLog"]>

  export type AccessLogSelectScalar = {
    id?: boolean
    recordCid?: boolean
    recipientPubkey?: boolean
    rewrapKeyId?: boolean
    success?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    errorMessage?: boolean
    accessedAt?: boolean
  }

  export type AccessLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "recordCid" | "recipientPubkey" | "rewrapKeyId" | "success" | "ipAddress" | "userAgent" | "errorMessage" | "accessedAt", ExtArgs["result"]["accessLog"]>
  export type AccessLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rewrapKey?: boolean | AccessLog$rewrapKeyArgs<ExtArgs>
  }
  export type AccessLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rewrapKey?: boolean | AccessLog$rewrapKeyArgs<ExtArgs>
  }
  export type AccessLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rewrapKey?: boolean | AccessLog$rewrapKeyArgs<ExtArgs>
  }

  export type $AccessLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AccessLog"
    objects: {
      rewrapKey: Prisma.$RewrapKeyPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      recordCid: string
      recipientPubkey: string
      rewrapKeyId: number | null
      success: boolean
      ipAddress: string | null
      userAgent: string | null
      errorMessage: string | null
      accessedAt: Date
    }, ExtArgs["result"]["accessLog"]>
    composites: {}
  }

  type AccessLogGetPayload<S extends boolean | null | undefined | AccessLogDefaultArgs> = $Result.GetResult<Prisma.$AccessLogPayload, S>

  type AccessLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccessLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccessLogCountAggregateInputType | true
    }

  export interface AccessLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AccessLog'], meta: { name: 'AccessLog' } }
    /**
     * Find zero or one AccessLog that matches the filter.
     * @param {AccessLogFindUniqueArgs} args - Arguments to find a AccessLog
     * @example
     * // Get one AccessLog
     * const accessLog = await prisma.accessLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccessLogFindUniqueArgs>(args: SelectSubset<T, AccessLogFindUniqueArgs<ExtArgs>>): Prisma__AccessLogClient<$Result.GetResult<Prisma.$AccessLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AccessLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccessLogFindUniqueOrThrowArgs} args - Arguments to find a AccessLog
     * @example
     * // Get one AccessLog
     * const accessLog = await prisma.accessLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccessLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AccessLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccessLogClient<$Result.GetResult<Prisma.$AccessLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AccessLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessLogFindFirstArgs} args - Arguments to find a AccessLog
     * @example
     * // Get one AccessLog
     * const accessLog = await prisma.accessLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccessLogFindFirstArgs>(args?: SelectSubset<T, AccessLogFindFirstArgs<ExtArgs>>): Prisma__AccessLogClient<$Result.GetResult<Prisma.$AccessLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AccessLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessLogFindFirstOrThrowArgs} args - Arguments to find a AccessLog
     * @example
     * // Get one AccessLog
     * const accessLog = await prisma.accessLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccessLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AccessLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccessLogClient<$Result.GetResult<Prisma.$AccessLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AccessLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AccessLogs
     * const accessLogs = await prisma.accessLog.findMany()
     * 
     * // Get first 10 AccessLogs
     * const accessLogs = await prisma.accessLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accessLogWithIdOnly = await prisma.accessLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccessLogFindManyArgs>(args?: SelectSubset<T, AccessLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AccessLog.
     * @param {AccessLogCreateArgs} args - Arguments to create a AccessLog.
     * @example
     * // Create one AccessLog
     * const AccessLog = await prisma.accessLog.create({
     *   data: {
     *     // ... data to create a AccessLog
     *   }
     * })
     * 
     */
    create<T extends AccessLogCreateArgs>(args: SelectSubset<T, AccessLogCreateArgs<ExtArgs>>): Prisma__AccessLogClient<$Result.GetResult<Prisma.$AccessLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AccessLogs.
     * @param {AccessLogCreateManyArgs} args - Arguments to create many AccessLogs.
     * @example
     * // Create many AccessLogs
     * const accessLog = await prisma.accessLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccessLogCreateManyArgs>(args?: SelectSubset<T, AccessLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AccessLogs and returns the data saved in the database.
     * @param {AccessLogCreateManyAndReturnArgs} args - Arguments to create many AccessLogs.
     * @example
     * // Create many AccessLogs
     * const accessLog = await prisma.accessLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AccessLogs and only return the `id`
     * const accessLogWithIdOnly = await prisma.accessLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccessLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AccessLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AccessLog.
     * @param {AccessLogDeleteArgs} args - Arguments to delete one AccessLog.
     * @example
     * // Delete one AccessLog
     * const AccessLog = await prisma.accessLog.delete({
     *   where: {
     *     // ... filter to delete one AccessLog
     *   }
     * })
     * 
     */
    delete<T extends AccessLogDeleteArgs>(args: SelectSubset<T, AccessLogDeleteArgs<ExtArgs>>): Prisma__AccessLogClient<$Result.GetResult<Prisma.$AccessLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AccessLog.
     * @param {AccessLogUpdateArgs} args - Arguments to update one AccessLog.
     * @example
     * // Update one AccessLog
     * const accessLog = await prisma.accessLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccessLogUpdateArgs>(args: SelectSubset<T, AccessLogUpdateArgs<ExtArgs>>): Prisma__AccessLogClient<$Result.GetResult<Prisma.$AccessLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AccessLogs.
     * @param {AccessLogDeleteManyArgs} args - Arguments to filter AccessLogs to delete.
     * @example
     * // Delete a few AccessLogs
     * const { count } = await prisma.accessLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccessLogDeleteManyArgs>(args?: SelectSubset<T, AccessLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccessLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AccessLogs
     * const accessLog = await prisma.accessLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccessLogUpdateManyArgs>(args: SelectSubset<T, AccessLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccessLogs and returns the data updated in the database.
     * @param {AccessLogUpdateManyAndReturnArgs} args - Arguments to update many AccessLogs.
     * @example
     * // Update many AccessLogs
     * const accessLog = await prisma.accessLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AccessLogs and only return the `id`
     * const accessLogWithIdOnly = await prisma.accessLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccessLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AccessLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AccessLog.
     * @param {AccessLogUpsertArgs} args - Arguments to update or create a AccessLog.
     * @example
     * // Update or create a AccessLog
     * const accessLog = await prisma.accessLog.upsert({
     *   create: {
     *     // ... data to create a AccessLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AccessLog we want to update
     *   }
     * })
     */
    upsert<T extends AccessLogUpsertArgs>(args: SelectSubset<T, AccessLogUpsertArgs<ExtArgs>>): Prisma__AccessLogClient<$Result.GetResult<Prisma.$AccessLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AccessLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessLogCountArgs} args - Arguments to filter AccessLogs to count.
     * @example
     * // Count the number of AccessLogs
     * const count = await prisma.accessLog.count({
     *   where: {
     *     // ... the filter for the AccessLogs we want to count
     *   }
     * })
    **/
    count<T extends AccessLogCountArgs>(
      args?: Subset<T, AccessLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccessLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AccessLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccessLogAggregateArgs>(args: Subset<T, AccessLogAggregateArgs>): Prisma.PrismaPromise<GetAccessLogAggregateType<T>>

    /**
     * Group by AccessLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccessLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccessLogGroupByArgs['orderBy'] }
        : { orderBy?: AccessLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccessLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccessLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AccessLog model
   */
  readonly fields: AccessLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AccessLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccessLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rewrapKey<T extends AccessLog$rewrapKeyArgs<ExtArgs> = {}>(args?: Subset<T, AccessLog$rewrapKeyArgs<ExtArgs>>): Prisma__RewrapKeyClient<$Result.GetResult<Prisma.$RewrapKeyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AccessLog model
   */
  interface AccessLogFieldRefs {
    readonly id: FieldRef<"AccessLog", 'Int'>
    readonly recordCid: FieldRef<"AccessLog", 'String'>
    readonly recipientPubkey: FieldRef<"AccessLog", 'String'>
    readonly rewrapKeyId: FieldRef<"AccessLog", 'Int'>
    readonly success: FieldRef<"AccessLog", 'Boolean'>
    readonly ipAddress: FieldRef<"AccessLog", 'String'>
    readonly userAgent: FieldRef<"AccessLog", 'String'>
    readonly errorMessage: FieldRef<"AccessLog", 'String'>
    readonly accessedAt: FieldRef<"AccessLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AccessLog findUnique
   */
  export type AccessLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogInclude<ExtArgs> | null
    /**
     * Filter, which AccessLog to fetch.
     */
    where: AccessLogWhereUniqueInput
  }

  /**
   * AccessLog findUniqueOrThrow
   */
  export type AccessLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogInclude<ExtArgs> | null
    /**
     * Filter, which AccessLog to fetch.
     */
    where: AccessLogWhereUniqueInput
  }

  /**
   * AccessLog findFirst
   */
  export type AccessLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogInclude<ExtArgs> | null
    /**
     * Filter, which AccessLog to fetch.
     */
    where?: AccessLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessLogs to fetch.
     */
    orderBy?: AccessLogOrderByWithRelationInput | AccessLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccessLogs.
     */
    cursor?: AccessLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccessLogs.
     */
    distinct?: AccessLogScalarFieldEnum | AccessLogScalarFieldEnum[]
  }

  /**
   * AccessLog findFirstOrThrow
   */
  export type AccessLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogInclude<ExtArgs> | null
    /**
     * Filter, which AccessLog to fetch.
     */
    where?: AccessLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessLogs to fetch.
     */
    orderBy?: AccessLogOrderByWithRelationInput | AccessLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccessLogs.
     */
    cursor?: AccessLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccessLogs.
     */
    distinct?: AccessLogScalarFieldEnum | AccessLogScalarFieldEnum[]
  }

  /**
   * AccessLog findMany
   */
  export type AccessLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogInclude<ExtArgs> | null
    /**
     * Filter, which AccessLogs to fetch.
     */
    where?: AccessLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessLogs to fetch.
     */
    orderBy?: AccessLogOrderByWithRelationInput | AccessLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AccessLogs.
     */
    cursor?: AccessLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessLogs.
     */
    skip?: number
    distinct?: AccessLogScalarFieldEnum | AccessLogScalarFieldEnum[]
  }

  /**
   * AccessLog create
   */
  export type AccessLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AccessLog.
     */
    data: XOR<AccessLogCreateInput, AccessLogUncheckedCreateInput>
  }

  /**
   * AccessLog createMany
   */
  export type AccessLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AccessLogs.
     */
    data: AccessLogCreateManyInput | AccessLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AccessLog createManyAndReturn
   */
  export type AccessLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * The data used to create many AccessLogs.
     */
    data: AccessLogCreateManyInput | AccessLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AccessLog update
   */
  export type AccessLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AccessLog.
     */
    data: XOR<AccessLogUpdateInput, AccessLogUncheckedUpdateInput>
    /**
     * Choose, which AccessLog to update.
     */
    where: AccessLogWhereUniqueInput
  }

  /**
   * AccessLog updateMany
   */
  export type AccessLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AccessLogs.
     */
    data: XOR<AccessLogUpdateManyMutationInput, AccessLogUncheckedUpdateManyInput>
    /**
     * Filter which AccessLogs to update
     */
    where?: AccessLogWhereInput
    /**
     * Limit how many AccessLogs to update.
     */
    limit?: number
  }

  /**
   * AccessLog updateManyAndReturn
   */
  export type AccessLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * The data used to update AccessLogs.
     */
    data: XOR<AccessLogUpdateManyMutationInput, AccessLogUncheckedUpdateManyInput>
    /**
     * Filter which AccessLogs to update
     */
    where?: AccessLogWhereInput
    /**
     * Limit how many AccessLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AccessLog upsert
   */
  export type AccessLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AccessLog to update in case it exists.
     */
    where: AccessLogWhereUniqueInput
    /**
     * In case the AccessLog found by the `where` argument doesn't exist, create a new AccessLog with this data.
     */
    create: XOR<AccessLogCreateInput, AccessLogUncheckedCreateInput>
    /**
     * In case the AccessLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccessLogUpdateInput, AccessLogUncheckedUpdateInput>
  }

  /**
   * AccessLog delete
   */
  export type AccessLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogInclude<ExtArgs> | null
    /**
     * Filter which AccessLog to delete.
     */
    where: AccessLogWhereUniqueInput
  }

  /**
   * AccessLog deleteMany
   */
  export type AccessLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AccessLogs to delete
     */
    where?: AccessLogWhereInput
    /**
     * Limit how many AccessLogs to delete.
     */
    limit?: number
  }

  /**
   * AccessLog.rewrapKey
   */
  export type AccessLog$rewrapKeyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrapKey
     */
    select?: RewrapKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewrapKey
     */
    omit?: RewrapKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrapKeyInclude<ExtArgs> | null
    where?: RewrapKeyWhereInput
  }

  /**
   * AccessLog without action
   */
  export type AccessLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogInclude<ExtArgs> | null
  }


  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminAvgAggregateOutputType = {
    id: number | null
  }

  export type AdminSumAggregateOutputType = {
    id: number | null
  }

  export type AdminMinAggregateOutputType = {
    id: number | null
    pubkey: string | null
    addedBy: string | null
    addedAt: Date | null
    isActive: boolean | null
  }

  export type AdminMaxAggregateOutputType = {
    id: number | null
    pubkey: string | null
    addedBy: string | null
    addedAt: Date | null
    isActive: boolean | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    pubkey: number
    addedBy: number
    addedAt: number
    isActive: number
    _all: number
  }


  export type AdminAvgAggregateInputType = {
    id?: true
  }

  export type AdminSumAggregateInputType = {
    id?: true
  }

  export type AdminMinAggregateInputType = {
    id?: true
    pubkey?: true
    addedBy?: true
    addedAt?: true
    isActive?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    pubkey?: true
    addedBy?: true
    addedAt?: true
    isActive?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    pubkey?: true
    addedBy?: true
    addedAt?: true
    isActive?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _avg?: AdminAvgAggregateInputType
    _sum?: AdminSumAggregateInputType
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: number
    pubkey: string
    addedBy: string | null
    addedAt: Date
    isActive: boolean
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pubkey?: boolean
    addedBy?: boolean
    addedAt?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pubkey?: boolean
    addedBy?: boolean
    addedAt?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pubkey?: boolean
    addedBy?: boolean
    addedAt?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectScalar = {
    id?: boolean
    pubkey?: boolean
    addedBy?: boolean
    addedAt?: boolean
    isActive?: boolean
  }

  export type AdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pubkey" | "addedBy" | "addedAt" | "isActive", ExtArgs["result"]["admin"]>

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      pubkey: string
      addedBy: string | null
      addedAt: Date
      isActive: boolean
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admins and returns the data saved in the database.
     * @param {AdminCreateManyAndReturnArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins and returns the data updated in the database.
     * @param {AdminUpdateManyAndReturnArgs} args - Arguments to update many Admins.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Admin model
   */
  interface AdminFieldRefs {
    readonly id: FieldRef<"Admin", 'Int'>
    readonly pubkey: FieldRef<"Admin", 'String'>
    readonly addedBy: FieldRef<"Admin", 'String'>
    readonly addedAt: FieldRef<"Admin", 'DateTime'>
    readonly isActive: FieldRef<"Admin", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin createManyAndReturn
   */
  export type AdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin updateManyAndReturn
   */
  export type AdminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to delete.
     */
    limit?: number
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
  }


  /**
   * Model ConsentCredential
   */

  export type AggregateConsentCredential = {
    _count: ConsentCredentialCountAggregateOutputType | null
    _avg: ConsentCredentialAvgAggregateOutputType | null
    _sum: ConsentCredentialSumAggregateOutputType | null
    _min: ConsentCredentialMinAggregateOutputType | null
    _max: ConsentCredentialMaxAggregateOutputType | null
  }

  export type ConsentCredentialAvgAggregateOutputType = {
    id: number | null
  }

  export type ConsentCredentialSumAggregateOutputType = {
    id: number | null
  }

  export type ConsentCredentialMinAggregateOutputType = {
    id: number | null
    consentCid: string | null
    recordCid: string | null
    issuerPubkey: string | null
    recipientPubkey: string | null
    expiresAt: Date | null
    createdAt: Date | null
    revokedAt: Date | null
    revokedReason: string | null
    anchoredTxId: string | null
  }

  export type ConsentCredentialMaxAggregateOutputType = {
    id: number | null
    consentCid: string | null
    recordCid: string | null
    issuerPubkey: string | null
    recipientPubkey: string | null
    expiresAt: Date | null
    createdAt: Date | null
    revokedAt: Date | null
    revokedReason: string | null
    anchoredTxId: string | null
  }

  export type ConsentCredentialCountAggregateOutputType = {
    id: number
    consentCid: number
    recordCid: number
    issuerPubkey: number
    recipientPubkey: number
    expiresAt: number
    createdAt: number
    revokedAt: number
    revokedReason: number
    anchoredTxId: number
    _all: number
  }


  export type ConsentCredentialAvgAggregateInputType = {
    id?: true
  }

  export type ConsentCredentialSumAggregateInputType = {
    id?: true
  }

  export type ConsentCredentialMinAggregateInputType = {
    id?: true
    consentCid?: true
    recordCid?: true
    issuerPubkey?: true
    recipientPubkey?: true
    expiresAt?: true
    createdAt?: true
    revokedAt?: true
    revokedReason?: true
    anchoredTxId?: true
  }

  export type ConsentCredentialMaxAggregateInputType = {
    id?: true
    consentCid?: true
    recordCid?: true
    issuerPubkey?: true
    recipientPubkey?: true
    expiresAt?: true
    createdAt?: true
    revokedAt?: true
    revokedReason?: true
    anchoredTxId?: true
  }

  export type ConsentCredentialCountAggregateInputType = {
    id?: true
    consentCid?: true
    recordCid?: true
    issuerPubkey?: true
    recipientPubkey?: true
    expiresAt?: true
    createdAt?: true
    revokedAt?: true
    revokedReason?: true
    anchoredTxId?: true
    _all?: true
  }

  export type ConsentCredentialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConsentCredential to aggregate.
     */
    where?: ConsentCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConsentCredentials to fetch.
     */
    orderBy?: ConsentCredentialOrderByWithRelationInput | ConsentCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConsentCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConsentCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConsentCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ConsentCredentials
    **/
    _count?: true | ConsentCredentialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConsentCredentialAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConsentCredentialSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConsentCredentialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConsentCredentialMaxAggregateInputType
  }

  export type GetConsentCredentialAggregateType<T extends ConsentCredentialAggregateArgs> = {
        [P in keyof T & keyof AggregateConsentCredential]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConsentCredential[P]>
      : GetScalarType<T[P], AggregateConsentCredential[P]>
  }




  export type ConsentCredentialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsentCredentialWhereInput
    orderBy?: ConsentCredentialOrderByWithAggregationInput | ConsentCredentialOrderByWithAggregationInput[]
    by: ConsentCredentialScalarFieldEnum[] | ConsentCredentialScalarFieldEnum
    having?: ConsentCredentialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConsentCredentialCountAggregateInputType | true
    _avg?: ConsentCredentialAvgAggregateInputType
    _sum?: ConsentCredentialSumAggregateInputType
    _min?: ConsentCredentialMinAggregateInputType
    _max?: ConsentCredentialMaxAggregateInputType
  }

  export type ConsentCredentialGroupByOutputType = {
    id: number
    consentCid: string
    recordCid: string
    issuerPubkey: string
    recipientPubkey: string
    expiresAt: Date | null
    createdAt: Date
    revokedAt: Date | null
    revokedReason: string | null
    anchoredTxId: string | null
    _count: ConsentCredentialCountAggregateOutputType | null
    _avg: ConsentCredentialAvgAggregateOutputType | null
    _sum: ConsentCredentialSumAggregateOutputType | null
    _min: ConsentCredentialMinAggregateOutputType | null
    _max: ConsentCredentialMaxAggregateOutputType | null
  }

  type GetConsentCredentialGroupByPayload<T extends ConsentCredentialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConsentCredentialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConsentCredentialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConsentCredentialGroupByOutputType[P]>
            : GetScalarType<T[P], ConsentCredentialGroupByOutputType[P]>
        }
      >
    >


  export type ConsentCredentialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    consentCid?: boolean
    recordCid?: boolean
    issuerPubkey?: boolean
    recipientPubkey?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    revokedAt?: boolean
    revokedReason?: boolean
    anchoredTxId?: boolean
  }, ExtArgs["result"]["consentCredential"]>

  export type ConsentCredentialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    consentCid?: boolean
    recordCid?: boolean
    issuerPubkey?: boolean
    recipientPubkey?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    revokedAt?: boolean
    revokedReason?: boolean
    anchoredTxId?: boolean
  }, ExtArgs["result"]["consentCredential"]>

  export type ConsentCredentialSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    consentCid?: boolean
    recordCid?: boolean
    issuerPubkey?: boolean
    recipientPubkey?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    revokedAt?: boolean
    revokedReason?: boolean
    anchoredTxId?: boolean
  }, ExtArgs["result"]["consentCredential"]>

  export type ConsentCredentialSelectScalar = {
    id?: boolean
    consentCid?: boolean
    recordCid?: boolean
    issuerPubkey?: boolean
    recipientPubkey?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    revokedAt?: boolean
    revokedReason?: boolean
    anchoredTxId?: boolean
  }

  export type ConsentCredentialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "consentCid" | "recordCid" | "issuerPubkey" | "recipientPubkey" | "expiresAt" | "createdAt" | "revokedAt" | "revokedReason" | "anchoredTxId", ExtArgs["result"]["consentCredential"]>

  export type $ConsentCredentialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ConsentCredential"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      consentCid: string
      recordCid: string
      issuerPubkey: string
      recipientPubkey: string
      expiresAt: Date | null
      createdAt: Date
      revokedAt: Date | null
      revokedReason: string | null
      anchoredTxId: string | null
    }, ExtArgs["result"]["consentCredential"]>
    composites: {}
  }

  type ConsentCredentialGetPayload<S extends boolean | null | undefined | ConsentCredentialDefaultArgs> = $Result.GetResult<Prisma.$ConsentCredentialPayload, S>

  type ConsentCredentialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConsentCredentialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConsentCredentialCountAggregateInputType | true
    }

  export interface ConsentCredentialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ConsentCredential'], meta: { name: 'ConsentCredential' } }
    /**
     * Find zero or one ConsentCredential that matches the filter.
     * @param {ConsentCredentialFindUniqueArgs} args - Arguments to find a ConsentCredential
     * @example
     * // Get one ConsentCredential
     * const consentCredential = await prisma.consentCredential.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConsentCredentialFindUniqueArgs>(args: SelectSubset<T, ConsentCredentialFindUniqueArgs<ExtArgs>>): Prisma__ConsentCredentialClient<$Result.GetResult<Prisma.$ConsentCredentialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ConsentCredential that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConsentCredentialFindUniqueOrThrowArgs} args - Arguments to find a ConsentCredential
     * @example
     * // Get one ConsentCredential
     * const consentCredential = await prisma.consentCredential.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConsentCredentialFindUniqueOrThrowArgs>(args: SelectSubset<T, ConsentCredentialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConsentCredentialClient<$Result.GetResult<Prisma.$ConsentCredentialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConsentCredential that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentCredentialFindFirstArgs} args - Arguments to find a ConsentCredential
     * @example
     * // Get one ConsentCredential
     * const consentCredential = await prisma.consentCredential.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConsentCredentialFindFirstArgs>(args?: SelectSubset<T, ConsentCredentialFindFirstArgs<ExtArgs>>): Prisma__ConsentCredentialClient<$Result.GetResult<Prisma.$ConsentCredentialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConsentCredential that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentCredentialFindFirstOrThrowArgs} args - Arguments to find a ConsentCredential
     * @example
     * // Get one ConsentCredential
     * const consentCredential = await prisma.consentCredential.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConsentCredentialFindFirstOrThrowArgs>(args?: SelectSubset<T, ConsentCredentialFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConsentCredentialClient<$Result.GetResult<Prisma.$ConsentCredentialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ConsentCredentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentCredentialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConsentCredentials
     * const consentCredentials = await prisma.consentCredential.findMany()
     * 
     * // Get first 10 ConsentCredentials
     * const consentCredentials = await prisma.consentCredential.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const consentCredentialWithIdOnly = await prisma.consentCredential.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConsentCredentialFindManyArgs>(args?: SelectSubset<T, ConsentCredentialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsentCredentialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ConsentCredential.
     * @param {ConsentCredentialCreateArgs} args - Arguments to create a ConsentCredential.
     * @example
     * // Create one ConsentCredential
     * const ConsentCredential = await prisma.consentCredential.create({
     *   data: {
     *     // ... data to create a ConsentCredential
     *   }
     * })
     * 
     */
    create<T extends ConsentCredentialCreateArgs>(args: SelectSubset<T, ConsentCredentialCreateArgs<ExtArgs>>): Prisma__ConsentCredentialClient<$Result.GetResult<Prisma.$ConsentCredentialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ConsentCredentials.
     * @param {ConsentCredentialCreateManyArgs} args - Arguments to create many ConsentCredentials.
     * @example
     * // Create many ConsentCredentials
     * const consentCredential = await prisma.consentCredential.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConsentCredentialCreateManyArgs>(args?: SelectSubset<T, ConsentCredentialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ConsentCredentials and returns the data saved in the database.
     * @param {ConsentCredentialCreateManyAndReturnArgs} args - Arguments to create many ConsentCredentials.
     * @example
     * // Create many ConsentCredentials
     * const consentCredential = await prisma.consentCredential.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ConsentCredentials and only return the `id`
     * const consentCredentialWithIdOnly = await prisma.consentCredential.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConsentCredentialCreateManyAndReturnArgs>(args?: SelectSubset<T, ConsentCredentialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsentCredentialPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ConsentCredential.
     * @param {ConsentCredentialDeleteArgs} args - Arguments to delete one ConsentCredential.
     * @example
     * // Delete one ConsentCredential
     * const ConsentCredential = await prisma.consentCredential.delete({
     *   where: {
     *     // ... filter to delete one ConsentCredential
     *   }
     * })
     * 
     */
    delete<T extends ConsentCredentialDeleteArgs>(args: SelectSubset<T, ConsentCredentialDeleteArgs<ExtArgs>>): Prisma__ConsentCredentialClient<$Result.GetResult<Prisma.$ConsentCredentialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ConsentCredential.
     * @param {ConsentCredentialUpdateArgs} args - Arguments to update one ConsentCredential.
     * @example
     * // Update one ConsentCredential
     * const consentCredential = await prisma.consentCredential.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConsentCredentialUpdateArgs>(args: SelectSubset<T, ConsentCredentialUpdateArgs<ExtArgs>>): Prisma__ConsentCredentialClient<$Result.GetResult<Prisma.$ConsentCredentialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ConsentCredentials.
     * @param {ConsentCredentialDeleteManyArgs} args - Arguments to filter ConsentCredentials to delete.
     * @example
     * // Delete a few ConsentCredentials
     * const { count } = await prisma.consentCredential.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConsentCredentialDeleteManyArgs>(args?: SelectSubset<T, ConsentCredentialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConsentCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentCredentialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConsentCredentials
     * const consentCredential = await prisma.consentCredential.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConsentCredentialUpdateManyArgs>(args: SelectSubset<T, ConsentCredentialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConsentCredentials and returns the data updated in the database.
     * @param {ConsentCredentialUpdateManyAndReturnArgs} args - Arguments to update many ConsentCredentials.
     * @example
     * // Update many ConsentCredentials
     * const consentCredential = await prisma.consentCredential.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ConsentCredentials and only return the `id`
     * const consentCredentialWithIdOnly = await prisma.consentCredential.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConsentCredentialUpdateManyAndReturnArgs>(args: SelectSubset<T, ConsentCredentialUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsentCredentialPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ConsentCredential.
     * @param {ConsentCredentialUpsertArgs} args - Arguments to update or create a ConsentCredential.
     * @example
     * // Update or create a ConsentCredential
     * const consentCredential = await prisma.consentCredential.upsert({
     *   create: {
     *     // ... data to create a ConsentCredential
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConsentCredential we want to update
     *   }
     * })
     */
    upsert<T extends ConsentCredentialUpsertArgs>(args: SelectSubset<T, ConsentCredentialUpsertArgs<ExtArgs>>): Prisma__ConsentCredentialClient<$Result.GetResult<Prisma.$ConsentCredentialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ConsentCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentCredentialCountArgs} args - Arguments to filter ConsentCredentials to count.
     * @example
     * // Count the number of ConsentCredentials
     * const count = await prisma.consentCredential.count({
     *   where: {
     *     // ... the filter for the ConsentCredentials we want to count
     *   }
     * })
    **/
    count<T extends ConsentCredentialCountArgs>(
      args?: Subset<T, ConsentCredentialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConsentCredentialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ConsentCredential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentCredentialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConsentCredentialAggregateArgs>(args: Subset<T, ConsentCredentialAggregateArgs>): Prisma.PrismaPromise<GetConsentCredentialAggregateType<T>>

    /**
     * Group by ConsentCredential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentCredentialGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConsentCredentialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConsentCredentialGroupByArgs['orderBy'] }
        : { orderBy?: ConsentCredentialGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConsentCredentialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConsentCredentialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ConsentCredential model
   */
  readonly fields: ConsentCredentialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ConsentCredential.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConsentCredentialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ConsentCredential model
   */
  interface ConsentCredentialFieldRefs {
    readonly id: FieldRef<"ConsentCredential", 'Int'>
    readonly consentCid: FieldRef<"ConsentCredential", 'String'>
    readonly recordCid: FieldRef<"ConsentCredential", 'String'>
    readonly issuerPubkey: FieldRef<"ConsentCredential", 'String'>
    readonly recipientPubkey: FieldRef<"ConsentCredential", 'String'>
    readonly expiresAt: FieldRef<"ConsentCredential", 'DateTime'>
    readonly createdAt: FieldRef<"ConsentCredential", 'DateTime'>
    readonly revokedAt: FieldRef<"ConsentCredential", 'DateTime'>
    readonly revokedReason: FieldRef<"ConsentCredential", 'String'>
    readonly anchoredTxId: FieldRef<"ConsentCredential", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ConsentCredential findUnique
   */
  export type ConsentCredentialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsentCredential
     */
    select?: ConsentCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsentCredential
     */
    omit?: ConsentCredentialOmit<ExtArgs> | null
    /**
     * Filter, which ConsentCredential to fetch.
     */
    where: ConsentCredentialWhereUniqueInput
  }

  /**
   * ConsentCredential findUniqueOrThrow
   */
  export type ConsentCredentialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsentCredential
     */
    select?: ConsentCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsentCredential
     */
    omit?: ConsentCredentialOmit<ExtArgs> | null
    /**
     * Filter, which ConsentCredential to fetch.
     */
    where: ConsentCredentialWhereUniqueInput
  }

  /**
   * ConsentCredential findFirst
   */
  export type ConsentCredentialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsentCredential
     */
    select?: ConsentCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsentCredential
     */
    omit?: ConsentCredentialOmit<ExtArgs> | null
    /**
     * Filter, which ConsentCredential to fetch.
     */
    where?: ConsentCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConsentCredentials to fetch.
     */
    orderBy?: ConsentCredentialOrderByWithRelationInput | ConsentCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConsentCredentials.
     */
    cursor?: ConsentCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConsentCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConsentCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConsentCredentials.
     */
    distinct?: ConsentCredentialScalarFieldEnum | ConsentCredentialScalarFieldEnum[]
  }

  /**
   * ConsentCredential findFirstOrThrow
   */
  export type ConsentCredentialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsentCredential
     */
    select?: ConsentCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsentCredential
     */
    omit?: ConsentCredentialOmit<ExtArgs> | null
    /**
     * Filter, which ConsentCredential to fetch.
     */
    where?: ConsentCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConsentCredentials to fetch.
     */
    orderBy?: ConsentCredentialOrderByWithRelationInput | ConsentCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConsentCredentials.
     */
    cursor?: ConsentCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConsentCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConsentCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConsentCredentials.
     */
    distinct?: ConsentCredentialScalarFieldEnum | ConsentCredentialScalarFieldEnum[]
  }

  /**
   * ConsentCredential findMany
   */
  export type ConsentCredentialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsentCredential
     */
    select?: ConsentCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsentCredential
     */
    omit?: ConsentCredentialOmit<ExtArgs> | null
    /**
     * Filter, which ConsentCredentials to fetch.
     */
    where?: ConsentCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConsentCredentials to fetch.
     */
    orderBy?: ConsentCredentialOrderByWithRelationInput | ConsentCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ConsentCredentials.
     */
    cursor?: ConsentCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConsentCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConsentCredentials.
     */
    skip?: number
    distinct?: ConsentCredentialScalarFieldEnum | ConsentCredentialScalarFieldEnum[]
  }

  /**
   * ConsentCredential create
   */
  export type ConsentCredentialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsentCredential
     */
    select?: ConsentCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsentCredential
     */
    omit?: ConsentCredentialOmit<ExtArgs> | null
    /**
     * The data needed to create a ConsentCredential.
     */
    data: XOR<ConsentCredentialCreateInput, ConsentCredentialUncheckedCreateInput>
  }

  /**
   * ConsentCredential createMany
   */
  export type ConsentCredentialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ConsentCredentials.
     */
    data: ConsentCredentialCreateManyInput | ConsentCredentialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConsentCredential createManyAndReturn
   */
  export type ConsentCredentialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsentCredential
     */
    select?: ConsentCredentialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConsentCredential
     */
    omit?: ConsentCredentialOmit<ExtArgs> | null
    /**
     * The data used to create many ConsentCredentials.
     */
    data: ConsentCredentialCreateManyInput | ConsentCredentialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConsentCredential update
   */
  export type ConsentCredentialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsentCredential
     */
    select?: ConsentCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsentCredential
     */
    omit?: ConsentCredentialOmit<ExtArgs> | null
    /**
     * The data needed to update a ConsentCredential.
     */
    data: XOR<ConsentCredentialUpdateInput, ConsentCredentialUncheckedUpdateInput>
    /**
     * Choose, which ConsentCredential to update.
     */
    where: ConsentCredentialWhereUniqueInput
  }

  /**
   * ConsentCredential updateMany
   */
  export type ConsentCredentialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ConsentCredentials.
     */
    data: XOR<ConsentCredentialUpdateManyMutationInput, ConsentCredentialUncheckedUpdateManyInput>
    /**
     * Filter which ConsentCredentials to update
     */
    where?: ConsentCredentialWhereInput
    /**
     * Limit how many ConsentCredentials to update.
     */
    limit?: number
  }

  /**
   * ConsentCredential updateManyAndReturn
   */
  export type ConsentCredentialUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsentCredential
     */
    select?: ConsentCredentialSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConsentCredential
     */
    omit?: ConsentCredentialOmit<ExtArgs> | null
    /**
     * The data used to update ConsentCredentials.
     */
    data: XOR<ConsentCredentialUpdateManyMutationInput, ConsentCredentialUncheckedUpdateManyInput>
    /**
     * Filter which ConsentCredentials to update
     */
    where?: ConsentCredentialWhereInput
    /**
     * Limit how many ConsentCredentials to update.
     */
    limit?: number
  }

  /**
   * ConsentCredential upsert
   */
  export type ConsentCredentialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsentCredential
     */
    select?: ConsentCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsentCredential
     */
    omit?: ConsentCredentialOmit<ExtArgs> | null
    /**
     * The filter to search for the ConsentCredential to update in case it exists.
     */
    where: ConsentCredentialWhereUniqueInput
    /**
     * In case the ConsentCredential found by the `where` argument doesn't exist, create a new ConsentCredential with this data.
     */
    create: XOR<ConsentCredentialCreateInput, ConsentCredentialUncheckedCreateInput>
    /**
     * In case the ConsentCredential was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConsentCredentialUpdateInput, ConsentCredentialUncheckedUpdateInput>
  }

  /**
   * ConsentCredential delete
   */
  export type ConsentCredentialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsentCredential
     */
    select?: ConsentCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsentCredential
     */
    omit?: ConsentCredentialOmit<ExtArgs> | null
    /**
     * Filter which ConsentCredential to delete.
     */
    where: ConsentCredentialWhereUniqueInput
  }

  /**
   * ConsentCredential deleteMany
   */
  export type ConsentCredentialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConsentCredentials to delete
     */
    where?: ConsentCredentialWhereInput
    /**
     * Limit how many ConsentCredentials to delete.
     */
    limit?: number
  }

  /**
   * ConsentCredential without action
   */
  export type ConsentCredentialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsentCredential
     */
    select?: ConsentCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConsentCredential
     */
    omit?: ConsentCredentialOmit<ExtArgs> | null
  }


  /**
   * Model RecordAnchor
   */

  export type AggregateRecordAnchor = {
    _count: RecordAnchorCountAggregateOutputType | null
    _avg: RecordAnchorAvgAggregateOutputType | null
    _sum: RecordAnchorSumAggregateOutputType | null
    _min: RecordAnchorMinAggregateOutputType | null
    _max: RecordAnchorMaxAggregateOutputType | null
  }

  export type RecordAnchorAvgAggregateOutputType = {
    id: number | null
  }

  export type RecordAnchorSumAggregateOutputType = {
    id: number | null
  }

  export type RecordAnchorMinAggregateOutputType = {
    id: number | null
    recordCid: string | null
    txSignature: string | null
    pda: string | null
    anchoredBy: string | null
    anchoredAt: Date | null
  }

  export type RecordAnchorMaxAggregateOutputType = {
    id: number | null
    recordCid: string | null
    txSignature: string | null
    pda: string | null
    anchoredBy: string | null
    anchoredAt: Date | null
  }

  export type RecordAnchorCountAggregateOutputType = {
    id: number
    recordCid: number
    txSignature: number
    pda: number
    anchoredBy: number
    anchoredAt: number
    _all: number
  }


  export type RecordAnchorAvgAggregateInputType = {
    id?: true
  }

  export type RecordAnchorSumAggregateInputType = {
    id?: true
  }

  export type RecordAnchorMinAggregateInputType = {
    id?: true
    recordCid?: true
    txSignature?: true
    pda?: true
    anchoredBy?: true
    anchoredAt?: true
  }

  export type RecordAnchorMaxAggregateInputType = {
    id?: true
    recordCid?: true
    txSignature?: true
    pda?: true
    anchoredBy?: true
    anchoredAt?: true
  }

  export type RecordAnchorCountAggregateInputType = {
    id?: true
    recordCid?: true
    txSignature?: true
    pda?: true
    anchoredBy?: true
    anchoredAt?: true
    _all?: true
  }

  export type RecordAnchorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecordAnchor to aggregate.
     */
    where?: RecordAnchorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecordAnchors to fetch.
     */
    orderBy?: RecordAnchorOrderByWithRelationInput | RecordAnchorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecordAnchorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecordAnchors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecordAnchors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RecordAnchors
    **/
    _count?: true | RecordAnchorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RecordAnchorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RecordAnchorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecordAnchorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecordAnchorMaxAggregateInputType
  }

  export type GetRecordAnchorAggregateType<T extends RecordAnchorAggregateArgs> = {
        [P in keyof T & keyof AggregateRecordAnchor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecordAnchor[P]>
      : GetScalarType<T[P], AggregateRecordAnchor[P]>
  }




  export type RecordAnchorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecordAnchorWhereInput
    orderBy?: RecordAnchorOrderByWithAggregationInput | RecordAnchorOrderByWithAggregationInput[]
    by: RecordAnchorScalarFieldEnum[] | RecordAnchorScalarFieldEnum
    having?: RecordAnchorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecordAnchorCountAggregateInputType | true
    _avg?: RecordAnchorAvgAggregateInputType
    _sum?: RecordAnchorSumAggregateInputType
    _min?: RecordAnchorMinAggregateInputType
    _max?: RecordAnchorMaxAggregateInputType
  }

  export type RecordAnchorGroupByOutputType = {
    id: number
    recordCid: string
    txSignature: string
    pda: string
    anchoredBy: string
    anchoredAt: Date
    _count: RecordAnchorCountAggregateOutputType | null
    _avg: RecordAnchorAvgAggregateOutputType | null
    _sum: RecordAnchorSumAggregateOutputType | null
    _min: RecordAnchorMinAggregateOutputType | null
    _max: RecordAnchorMaxAggregateOutputType | null
  }

  type GetRecordAnchorGroupByPayload<T extends RecordAnchorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecordAnchorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecordAnchorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecordAnchorGroupByOutputType[P]>
            : GetScalarType<T[P], RecordAnchorGroupByOutputType[P]>
        }
      >
    >


  export type RecordAnchorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    recordCid?: boolean
    txSignature?: boolean
    pda?: boolean
    anchoredBy?: boolean
    anchoredAt?: boolean
  }, ExtArgs["result"]["recordAnchor"]>

  export type RecordAnchorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    recordCid?: boolean
    txSignature?: boolean
    pda?: boolean
    anchoredBy?: boolean
    anchoredAt?: boolean
  }, ExtArgs["result"]["recordAnchor"]>

  export type RecordAnchorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    recordCid?: boolean
    txSignature?: boolean
    pda?: boolean
    anchoredBy?: boolean
    anchoredAt?: boolean
  }, ExtArgs["result"]["recordAnchor"]>

  export type RecordAnchorSelectScalar = {
    id?: boolean
    recordCid?: boolean
    txSignature?: boolean
    pda?: boolean
    anchoredBy?: boolean
    anchoredAt?: boolean
  }

  export type RecordAnchorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "recordCid" | "txSignature" | "pda" | "anchoredBy" | "anchoredAt", ExtArgs["result"]["recordAnchor"]>

  export type $RecordAnchorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RecordAnchor"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      recordCid: string
      txSignature: string
      pda: string
      anchoredBy: string
      anchoredAt: Date
    }, ExtArgs["result"]["recordAnchor"]>
    composites: {}
  }

  type RecordAnchorGetPayload<S extends boolean | null | undefined | RecordAnchorDefaultArgs> = $Result.GetResult<Prisma.$RecordAnchorPayload, S>

  type RecordAnchorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecordAnchorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecordAnchorCountAggregateInputType | true
    }

  export interface RecordAnchorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RecordAnchor'], meta: { name: 'RecordAnchor' } }
    /**
     * Find zero or one RecordAnchor that matches the filter.
     * @param {RecordAnchorFindUniqueArgs} args - Arguments to find a RecordAnchor
     * @example
     * // Get one RecordAnchor
     * const recordAnchor = await prisma.recordAnchor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecordAnchorFindUniqueArgs>(args: SelectSubset<T, RecordAnchorFindUniqueArgs<ExtArgs>>): Prisma__RecordAnchorClient<$Result.GetResult<Prisma.$RecordAnchorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RecordAnchor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecordAnchorFindUniqueOrThrowArgs} args - Arguments to find a RecordAnchor
     * @example
     * // Get one RecordAnchor
     * const recordAnchor = await prisma.recordAnchor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecordAnchorFindUniqueOrThrowArgs>(args: SelectSubset<T, RecordAnchorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecordAnchorClient<$Result.GetResult<Prisma.$RecordAnchorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecordAnchor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordAnchorFindFirstArgs} args - Arguments to find a RecordAnchor
     * @example
     * // Get one RecordAnchor
     * const recordAnchor = await prisma.recordAnchor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecordAnchorFindFirstArgs>(args?: SelectSubset<T, RecordAnchorFindFirstArgs<ExtArgs>>): Prisma__RecordAnchorClient<$Result.GetResult<Prisma.$RecordAnchorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecordAnchor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordAnchorFindFirstOrThrowArgs} args - Arguments to find a RecordAnchor
     * @example
     * // Get one RecordAnchor
     * const recordAnchor = await prisma.recordAnchor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecordAnchorFindFirstOrThrowArgs>(args?: SelectSubset<T, RecordAnchorFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecordAnchorClient<$Result.GetResult<Prisma.$RecordAnchorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RecordAnchors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordAnchorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecordAnchors
     * const recordAnchors = await prisma.recordAnchor.findMany()
     * 
     * // Get first 10 RecordAnchors
     * const recordAnchors = await prisma.recordAnchor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recordAnchorWithIdOnly = await prisma.recordAnchor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecordAnchorFindManyArgs>(args?: SelectSubset<T, RecordAnchorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordAnchorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RecordAnchor.
     * @param {RecordAnchorCreateArgs} args - Arguments to create a RecordAnchor.
     * @example
     * // Create one RecordAnchor
     * const RecordAnchor = await prisma.recordAnchor.create({
     *   data: {
     *     // ... data to create a RecordAnchor
     *   }
     * })
     * 
     */
    create<T extends RecordAnchorCreateArgs>(args: SelectSubset<T, RecordAnchorCreateArgs<ExtArgs>>): Prisma__RecordAnchorClient<$Result.GetResult<Prisma.$RecordAnchorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RecordAnchors.
     * @param {RecordAnchorCreateManyArgs} args - Arguments to create many RecordAnchors.
     * @example
     * // Create many RecordAnchors
     * const recordAnchor = await prisma.recordAnchor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecordAnchorCreateManyArgs>(args?: SelectSubset<T, RecordAnchorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RecordAnchors and returns the data saved in the database.
     * @param {RecordAnchorCreateManyAndReturnArgs} args - Arguments to create many RecordAnchors.
     * @example
     * // Create many RecordAnchors
     * const recordAnchor = await prisma.recordAnchor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RecordAnchors and only return the `id`
     * const recordAnchorWithIdOnly = await prisma.recordAnchor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecordAnchorCreateManyAndReturnArgs>(args?: SelectSubset<T, RecordAnchorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordAnchorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RecordAnchor.
     * @param {RecordAnchorDeleteArgs} args - Arguments to delete one RecordAnchor.
     * @example
     * // Delete one RecordAnchor
     * const RecordAnchor = await prisma.recordAnchor.delete({
     *   where: {
     *     // ... filter to delete one RecordAnchor
     *   }
     * })
     * 
     */
    delete<T extends RecordAnchorDeleteArgs>(args: SelectSubset<T, RecordAnchorDeleteArgs<ExtArgs>>): Prisma__RecordAnchorClient<$Result.GetResult<Prisma.$RecordAnchorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RecordAnchor.
     * @param {RecordAnchorUpdateArgs} args - Arguments to update one RecordAnchor.
     * @example
     * // Update one RecordAnchor
     * const recordAnchor = await prisma.recordAnchor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecordAnchorUpdateArgs>(args: SelectSubset<T, RecordAnchorUpdateArgs<ExtArgs>>): Prisma__RecordAnchorClient<$Result.GetResult<Prisma.$RecordAnchorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RecordAnchors.
     * @param {RecordAnchorDeleteManyArgs} args - Arguments to filter RecordAnchors to delete.
     * @example
     * // Delete a few RecordAnchors
     * const { count } = await prisma.recordAnchor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecordAnchorDeleteManyArgs>(args?: SelectSubset<T, RecordAnchorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecordAnchors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordAnchorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecordAnchors
     * const recordAnchor = await prisma.recordAnchor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecordAnchorUpdateManyArgs>(args: SelectSubset<T, RecordAnchorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecordAnchors and returns the data updated in the database.
     * @param {RecordAnchorUpdateManyAndReturnArgs} args - Arguments to update many RecordAnchors.
     * @example
     * // Update many RecordAnchors
     * const recordAnchor = await prisma.recordAnchor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RecordAnchors and only return the `id`
     * const recordAnchorWithIdOnly = await prisma.recordAnchor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RecordAnchorUpdateManyAndReturnArgs>(args: SelectSubset<T, RecordAnchorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordAnchorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RecordAnchor.
     * @param {RecordAnchorUpsertArgs} args - Arguments to update or create a RecordAnchor.
     * @example
     * // Update or create a RecordAnchor
     * const recordAnchor = await prisma.recordAnchor.upsert({
     *   create: {
     *     // ... data to create a RecordAnchor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecordAnchor we want to update
     *   }
     * })
     */
    upsert<T extends RecordAnchorUpsertArgs>(args: SelectSubset<T, RecordAnchorUpsertArgs<ExtArgs>>): Prisma__RecordAnchorClient<$Result.GetResult<Prisma.$RecordAnchorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RecordAnchors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordAnchorCountArgs} args - Arguments to filter RecordAnchors to count.
     * @example
     * // Count the number of RecordAnchors
     * const count = await prisma.recordAnchor.count({
     *   where: {
     *     // ... the filter for the RecordAnchors we want to count
     *   }
     * })
    **/
    count<T extends RecordAnchorCountArgs>(
      args?: Subset<T, RecordAnchorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecordAnchorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RecordAnchor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordAnchorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecordAnchorAggregateArgs>(args: Subset<T, RecordAnchorAggregateArgs>): Prisma.PrismaPromise<GetRecordAnchorAggregateType<T>>

    /**
     * Group by RecordAnchor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordAnchorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecordAnchorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecordAnchorGroupByArgs['orderBy'] }
        : { orderBy?: RecordAnchorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecordAnchorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecordAnchorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RecordAnchor model
   */
  readonly fields: RecordAnchorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RecordAnchor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecordAnchorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RecordAnchor model
   */
  interface RecordAnchorFieldRefs {
    readonly id: FieldRef<"RecordAnchor", 'Int'>
    readonly recordCid: FieldRef<"RecordAnchor", 'String'>
    readonly txSignature: FieldRef<"RecordAnchor", 'String'>
    readonly pda: FieldRef<"RecordAnchor", 'String'>
    readonly anchoredBy: FieldRef<"RecordAnchor", 'String'>
    readonly anchoredAt: FieldRef<"RecordAnchor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RecordAnchor findUnique
   */
  export type RecordAnchorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordAnchor
     */
    select?: RecordAnchorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordAnchor
     */
    omit?: RecordAnchorOmit<ExtArgs> | null
    /**
     * Filter, which RecordAnchor to fetch.
     */
    where: RecordAnchorWhereUniqueInput
  }

  /**
   * RecordAnchor findUniqueOrThrow
   */
  export type RecordAnchorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordAnchor
     */
    select?: RecordAnchorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordAnchor
     */
    omit?: RecordAnchorOmit<ExtArgs> | null
    /**
     * Filter, which RecordAnchor to fetch.
     */
    where: RecordAnchorWhereUniqueInput
  }

  /**
   * RecordAnchor findFirst
   */
  export type RecordAnchorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordAnchor
     */
    select?: RecordAnchorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordAnchor
     */
    omit?: RecordAnchorOmit<ExtArgs> | null
    /**
     * Filter, which RecordAnchor to fetch.
     */
    where?: RecordAnchorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecordAnchors to fetch.
     */
    orderBy?: RecordAnchorOrderByWithRelationInput | RecordAnchorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecordAnchors.
     */
    cursor?: RecordAnchorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecordAnchors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecordAnchors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecordAnchors.
     */
    distinct?: RecordAnchorScalarFieldEnum | RecordAnchorScalarFieldEnum[]
  }

  /**
   * RecordAnchor findFirstOrThrow
   */
  export type RecordAnchorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordAnchor
     */
    select?: RecordAnchorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordAnchor
     */
    omit?: RecordAnchorOmit<ExtArgs> | null
    /**
     * Filter, which RecordAnchor to fetch.
     */
    where?: RecordAnchorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecordAnchors to fetch.
     */
    orderBy?: RecordAnchorOrderByWithRelationInput | RecordAnchorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecordAnchors.
     */
    cursor?: RecordAnchorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecordAnchors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecordAnchors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecordAnchors.
     */
    distinct?: RecordAnchorScalarFieldEnum | RecordAnchorScalarFieldEnum[]
  }

  /**
   * RecordAnchor findMany
   */
  export type RecordAnchorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordAnchor
     */
    select?: RecordAnchorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordAnchor
     */
    omit?: RecordAnchorOmit<ExtArgs> | null
    /**
     * Filter, which RecordAnchors to fetch.
     */
    where?: RecordAnchorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecordAnchors to fetch.
     */
    orderBy?: RecordAnchorOrderByWithRelationInput | RecordAnchorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RecordAnchors.
     */
    cursor?: RecordAnchorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecordAnchors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecordAnchors.
     */
    skip?: number
    distinct?: RecordAnchorScalarFieldEnum | RecordAnchorScalarFieldEnum[]
  }

  /**
   * RecordAnchor create
   */
  export type RecordAnchorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordAnchor
     */
    select?: RecordAnchorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordAnchor
     */
    omit?: RecordAnchorOmit<ExtArgs> | null
    /**
     * The data needed to create a RecordAnchor.
     */
    data: XOR<RecordAnchorCreateInput, RecordAnchorUncheckedCreateInput>
  }

  /**
   * RecordAnchor createMany
   */
  export type RecordAnchorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RecordAnchors.
     */
    data: RecordAnchorCreateManyInput | RecordAnchorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RecordAnchor createManyAndReturn
   */
  export type RecordAnchorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordAnchor
     */
    select?: RecordAnchorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecordAnchor
     */
    omit?: RecordAnchorOmit<ExtArgs> | null
    /**
     * The data used to create many RecordAnchors.
     */
    data: RecordAnchorCreateManyInput | RecordAnchorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RecordAnchor update
   */
  export type RecordAnchorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordAnchor
     */
    select?: RecordAnchorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordAnchor
     */
    omit?: RecordAnchorOmit<ExtArgs> | null
    /**
     * The data needed to update a RecordAnchor.
     */
    data: XOR<RecordAnchorUpdateInput, RecordAnchorUncheckedUpdateInput>
    /**
     * Choose, which RecordAnchor to update.
     */
    where: RecordAnchorWhereUniqueInput
  }

  /**
   * RecordAnchor updateMany
   */
  export type RecordAnchorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RecordAnchors.
     */
    data: XOR<RecordAnchorUpdateManyMutationInput, RecordAnchorUncheckedUpdateManyInput>
    /**
     * Filter which RecordAnchors to update
     */
    where?: RecordAnchorWhereInput
    /**
     * Limit how many RecordAnchors to update.
     */
    limit?: number
  }

  /**
   * RecordAnchor updateManyAndReturn
   */
  export type RecordAnchorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordAnchor
     */
    select?: RecordAnchorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecordAnchor
     */
    omit?: RecordAnchorOmit<ExtArgs> | null
    /**
     * The data used to update RecordAnchors.
     */
    data: XOR<RecordAnchorUpdateManyMutationInput, RecordAnchorUncheckedUpdateManyInput>
    /**
     * Filter which RecordAnchors to update
     */
    where?: RecordAnchorWhereInput
    /**
     * Limit how many RecordAnchors to update.
     */
    limit?: number
  }

  /**
   * RecordAnchor upsert
   */
  export type RecordAnchorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordAnchor
     */
    select?: RecordAnchorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordAnchor
     */
    omit?: RecordAnchorOmit<ExtArgs> | null
    /**
     * The filter to search for the RecordAnchor to update in case it exists.
     */
    where: RecordAnchorWhereUniqueInput
    /**
     * In case the RecordAnchor found by the `where` argument doesn't exist, create a new RecordAnchor with this data.
     */
    create: XOR<RecordAnchorCreateInput, RecordAnchorUncheckedCreateInput>
    /**
     * In case the RecordAnchor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecordAnchorUpdateInput, RecordAnchorUncheckedUpdateInput>
  }

  /**
   * RecordAnchor delete
   */
  export type RecordAnchorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordAnchor
     */
    select?: RecordAnchorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordAnchor
     */
    omit?: RecordAnchorOmit<ExtArgs> | null
    /**
     * Filter which RecordAnchor to delete.
     */
    where: RecordAnchorWhereUniqueInput
  }

  /**
   * RecordAnchor deleteMany
   */
  export type RecordAnchorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecordAnchors to delete
     */
    where?: RecordAnchorWhereInput
    /**
     * Limit how many RecordAnchors to delete.
     */
    limit?: number
  }

  /**
   * RecordAnchor without action
   */
  export type RecordAnchorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordAnchor
     */
    select?: RecordAnchorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecordAnchor
     */
    omit?: RecordAnchorOmit<ExtArgs> | null
  }


  /**
   * Model AccessRequest
   */

  export type AggregateAccessRequest = {
    _count: AccessRequestCountAggregateOutputType | null
    _avg: AccessRequestAvgAggregateOutputType | null
    _sum: AccessRequestSumAggregateOutputType | null
    _min: AccessRequestMinAggregateOutputType | null
    _max: AccessRequestMaxAggregateOutputType | null
  }

  export type AccessRequestAvgAggregateOutputType = {
    id: number | null
    consentId: number | null
  }

  export type AccessRequestSumAggregateOutputType = {
    id: number | null
    consentId: number | null
  }

  export type AccessRequestMinAggregateOutputType = {
    id: number | null
    recordCid: string | null
    requesterPubkey: string | null
    ownerPubkey: string | null
    purpose: string | null
    status: string | null
    respondedAt: Date | null
    responseNote: string | null
    consentId: number | null
    createdAt: Date | null
  }

  export type AccessRequestMaxAggregateOutputType = {
    id: number | null
    recordCid: string | null
    requesterPubkey: string | null
    ownerPubkey: string | null
    purpose: string | null
    status: string | null
    respondedAt: Date | null
    responseNote: string | null
    consentId: number | null
    createdAt: Date | null
  }

  export type AccessRequestCountAggregateOutputType = {
    id: number
    recordCid: number
    requesterPubkey: number
    ownerPubkey: number
    purpose: number
    status: number
    respondedAt: number
    responseNote: number
    consentId: number
    createdAt: number
    _all: number
  }


  export type AccessRequestAvgAggregateInputType = {
    id?: true
    consentId?: true
  }

  export type AccessRequestSumAggregateInputType = {
    id?: true
    consentId?: true
  }

  export type AccessRequestMinAggregateInputType = {
    id?: true
    recordCid?: true
    requesterPubkey?: true
    ownerPubkey?: true
    purpose?: true
    status?: true
    respondedAt?: true
    responseNote?: true
    consentId?: true
    createdAt?: true
  }

  export type AccessRequestMaxAggregateInputType = {
    id?: true
    recordCid?: true
    requesterPubkey?: true
    ownerPubkey?: true
    purpose?: true
    status?: true
    respondedAt?: true
    responseNote?: true
    consentId?: true
    createdAt?: true
  }

  export type AccessRequestCountAggregateInputType = {
    id?: true
    recordCid?: true
    requesterPubkey?: true
    ownerPubkey?: true
    purpose?: true
    status?: true
    respondedAt?: true
    responseNote?: true
    consentId?: true
    createdAt?: true
    _all?: true
  }

  export type AccessRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AccessRequest to aggregate.
     */
    where?: AccessRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessRequests to fetch.
     */
    orderBy?: AccessRequestOrderByWithRelationInput | AccessRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccessRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AccessRequests
    **/
    _count?: true | AccessRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccessRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccessRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccessRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccessRequestMaxAggregateInputType
  }

  export type GetAccessRequestAggregateType<T extends AccessRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateAccessRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccessRequest[P]>
      : GetScalarType<T[P], AggregateAccessRequest[P]>
  }




  export type AccessRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccessRequestWhereInput
    orderBy?: AccessRequestOrderByWithAggregationInput | AccessRequestOrderByWithAggregationInput[]
    by: AccessRequestScalarFieldEnum[] | AccessRequestScalarFieldEnum
    having?: AccessRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccessRequestCountAggregateInputType | true
    _avg?: AccessRequestAvgAggregateInputType
    _sum?: AccessRequestSumAggregateInputType
    _min?: AccessRequestMinAggregateInputType
    _max?: AccessRequestMaxAggregateInputType
  }

  export type AccessRequestGroupByOutputType = {
    id: number
    recordCid: string
    requesterPubkey: string
    ownerPubkey: string
    purpose: string
    status: string
    respondedAt: Date | null
    responseNote: string | null
    consentId: number | null
    createdAt: Date
    _count: AccessRequestCountAggregateOutputType | null
    _avg: AccessRequestAvgAggregateOutputType | null
    _sum: AccessRequestSumAggregateOutputType | null
    _min: AccessRequestMinAggregateOutputType | null
    _max: AccessRequestMaxAggregateOutputType | null
  }

  type GetAccessRequestGroupByPayload<T extends AccessRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccessRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccessRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccessRequestGroupByOutputType[P]>
            : GetScalarType<T[P], AccessRequestGroupByOutputType[P]>
        }
      >
    >


  export type AccessRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    recordCid?: boolean
    requesterPubkey?: boolean
    ownerPubkey?: boolean
    purpose?: boolean
    status?: boolean
    respondedAt?: boolean
    responseNote?: boolean
    consentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["accessRequest"]>

  export type AccessRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    recordCid?: boolean
    requesterPubkey?: boolean
    ownerPubkey?: boolean
    purpose?: boolean
    status?: boolean
    respondedAt?: boolean
    responseNote?: boolean
    consentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["accessRequest"]>

  export type AccessRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    recordCid?: boolean
    requesterPubkey?: boolean
    ownerPubkey?: boolean
    purpose?: boolean
    status?: boolean
    respondedAt?: boolean
    responseNote?: boolean
    consentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["accessRequest"]>

  export type AccessRequestSelectScalar = {
    id?: boolean
    recordCid?: boolean
    requesterPubkey?: boolean
    ownerPubkey?: boolean
    purpose?: boolean
    status?: boolean
    respondedAt?: boolean
    responseNote?: boolean
    consentId?: boolean
    createdAt?: boolean
  }

  export type AccessRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "recordCid" | "requesterPubkey" | "ownerPubkey" | "purpose" | "status" | "respondedAt" | "responseNote" | "consentId" | "createdAt", ExtArgs["result"]["accessRequest"]>

  export type $AccessRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AccessRequest"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      recordCid: string
      requesterPubkey: string
      ownerPubkey: string
      purpose: string
      status: string
      respondedAt: Date | null
      responseNote: string | null
      consentId: number | null
      createdAt: Date
    }, ExtArgs["result"]["accessRequest"]>
    composites: {}
  }

  type AccessRequestGetPayload<S extends boolean | null | undefined | AccessRequestDefaultArgs> = $Result.GetResult<Prisma.$AccessRequestPayload, S>

  type AccessRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccessRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccessRequestCountAggregateInputType | true
    }

  export interface AccessRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AccessRequest'], meta: { name: 'AccessRequest' } }
    /**
     * Find zero or one AccessRequest that matches the filter.
     * @param {AccessRequestFindUniqueArgs} args - Arguments to find a AccessRequest
     * @example
     * // Get one AccessRequest
     * const accessRequest = await prisma.accessRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccessRequestFindUniqueArgs>(args: SelectSubset<T, AccessRequestFindUniqueArgs<ExtArgs>>): Prisma__AccessRequestClient<$Result.GetResult<Prisma.$AccessRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AccessRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccessRequestFindUniqueOrThrowArgs} args - Arguments to find a AccessRequest
     * @example
     * // Get one AccessRequest
     * const accessRequest = await prisma.accessRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccessRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, AccessRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccessRequestClient<$Result.GetResult<Prisma.$AccessRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AccessRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessRequestFindFirstArgs} args - Arguments to find a AccessRequest
     * @example
     * // Get one AccessRequest
     * const accessRequest = await prisma.accessRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccessRequestFindFirstArgs>(args?: SelectSubset<T, AccessRequestFindFirstArgs<ExtArgs>>): Prisma__AccessRequestClient<$Result.GetResult<Prisma.$AccessRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AccessRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessRequestFindFirstOrThrowArgs} args - Arguments to find a AccessRequest
     * @example
     * // Get one AccessRequest
     * const accessRequest = await prisma.accessRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccessRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, AccessRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccessRequestClient<$Result.GetResult<Prisma.$AccessRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AccessRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AccessRequests
     * const accessRequests = await prisma.accessRequest.findMany()
     * 
     * // Get first 10 AccessRequests
     * const accessRequests = await prisma.accessRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accessRequestWithIdOnly = await prisma.accessRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccessRequestFindManyArgs>(args?: SelectSubset<T, AccessRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AccessRequest.
     * @param {AccessRequestCreateArgs} args - Arguments to create a AccessRequest.
     * @example
     * // Create one AccessRequest
     * const AccessRequest = await prisma.accessRequest.create({
     *   data: {
     *     // ... data to create a AccessRequest
     *   }
     * })
     * 
     */
    create<T extends AccessRequestCreateArgs>(args: SelectSubset<T, AccessRequestCreateArgs<ExtArgs>>): Prisma__AccessRequestClient<$Result.GetResult<Prisma.$AccessRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AccessRequests.
     * @param {AccessRequestCreateManyArgs} args - Arguments to create many AccessRequests.
     * @example
     * // Create many AccessRequests
     * const accessRequest = await prisma.accessRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccessRequestCreateManyArgs>(args?: SelectSubset<T, AccessRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AccessRequests and returns the data saved in the database.
     * @param {AccessRequestCreateManyAndReturnArgs} args - Arguments to create many AccessRequests.
     * @example
     * // Create many AccessRequests
     * const accessRequest = await prisma.accessRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AccessRequests and only return the `id`
     * const accessRequestWithIdOnly = await prisma.accessRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccessRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, AccessRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AccessRequest.
     * @param {AccessRequestDeleteArgs} args - Arguments to delete one AccessRequest.
     * @example
     * // Delete one AccessRequest
     * const AccessRequest = await prisma.accessRequest.delete({
     *   where: {
     *     // ... filter to delete one AccessRequest
     *   }
     * })
     * 
     */
    delete<T extends AccessRequestDeleteArgs>(args: SelectSubset<T, AccessRequestDeleteArgs<ExtArgs>>): Prisma__AccessRequestClient<$Result.GetResult<Prisma.$AccessRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AccessRequest.
     * @param {AccessRequestUpdateArgs} args - Arguments to update one AccessRequest.
     * @example
     * // Update one AccessRequest
     * const accessRequest = await prisma.accessRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccessRequestUpdateArgs>(args: SelectSubset<T, AccessRequestUpdateArgs<ExtArgs>>): Prisma__AccessRequestClient<$Result.GetResult<Prisma.$AccessRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AccessRequests.
     * @param {AccessRequestDeleteManyArgs} args - Arguments to filter AccessRequests to delete.
     * @example
     * // Delete a few AccessRequests
     * const { count } = await prisma.accessRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccessRequestDeleteManyArgs>(args?: SelectSubset<T, AccessRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccessRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AccessRequests
     * const accessRequest = await prisma.accessRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccessRequestUpdateManyArgs>(args: SelectSubset<T, AccessRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccessRequests and returns the data updated in the database.
     * @param {AccessRequestUpdateManyAndReturnArgs} args - Arguments to update many AccessRequests.
     * @example
     * // Update many AccessRequests
     * const accessRequest = await prisma.accessRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AccessRequests and only return the `id`
     * const accessRequestWithIdOnly = await prisma.accessRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccessRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, AccessRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AccessRequest.
     * @param {AccessRequestUpsertArgs} args - Arguments to update or create a AccessRequest.
     * @example
     * // Update or create a AccessRequest
     * const accessRequest = await prisma.accessRequest.upsert({
     *   create: {
     *     // ... data to create a AccessRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AccessRequest we want to update
     *   }
     * })
     */
    upsert<T extends AccessRequestUpsertArgs>(args: SelectSubset<T, AccessRequestUpsertArgs<ExtArgs>>): Prisma__AccessRequestClient<$Result.GetResult<Prisma.$AccessRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AccessRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessRequestCountArgs} args - Arguments to filter AccessRequests to count.
     * @example
     * // Count the number of AccessRequests
     * const count = await prisma.accessRequest.count({
     *   where: {
     *     // ... the filter for the AccessRequests we want to count
     *   }
     * })
    **/
    count<T extends AccessRequestCountArgs>(
      args?: Subset<T, AccessRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccessRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AccessRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccessRequestAggregateArgs>(args: Subset<T, AccessRequestAggregateArgs>): Prisma.PrismaPromise<GetAccessRequestAggregateType<T>>

    /**
     * Group by AccessRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccessRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccessRequestGroupByArgs['orderBy'] }
        : { orderBy?: AccessRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccessRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccessRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AccessRequest model
   */
  readonly fields: AccessRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AccessRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccessRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AccessRequest model
   */
  interface AccessRequestFieldRefs {
    readonly id: FieldRef<"AccessRequest", 'Int'>
    readonly recordCid: FieldRef<"AccessRequest", 'String'>
    readonly requesterPubkey: FieldRef<"AccessRequest", 'String'>
    readonly ownerPubkey: FieldRef<"AccessRequest", 'String'>
    readonly purpose: FieldRef<"AccessRequest", 'String'>
    readonly status: FieldRef<"AccessRequest", 'String'>
    readonly respondedAt: FieldRef<"AccessRequest", 'DateTime'>
    readonly responseNote: FieldRef<"AccessRequest", 'String'>
    readonly consentId: FieldRef<"AccessRequest", 'Int'>
    readonly createdAt: FieldRef<"AccessRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AccessRequest findUnique
   */
  export type AccessRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessRequest
     */
    select?: AccessRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessRequest
     */
    omit?: AccessRequestOmit<ExtArgs> | null
    /**
     * Filter, which AccessRequest to fetch.
     */
    where: AccessRequestWhereUniqueInput
  }

  /**
   * AccessRequest findUniqueOrThrow
   */
  export type AccessRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessRequest
     */
    select?: AccessRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessRequest
     */
    omit?: AccessRequestOmit<ExtArgs> | null
    /**
     * Filter, which AccessRequest to fetch.
     */
    where: AccessRequestWhereUniqueInput
  }

  /**
   * AccessRequest findFirst
   */
  export type AccessRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessRequest
     */
    select?: AccessRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessRequest
     */
    omit?: AccessRequestOmit<ExtArgs> | null
    /**
     * Filter, which AccessRequest to fetch.
     */
    where?: AccessRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessRequests to fetch.
     */
    orderBy?: AccessRequestOrderByWithRelationInput | AccessRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccessRequests.
     */
    cursor?: AccessRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccessRequests.
     */
    distinct?: AccessRequestScalarFieldEnum | AccessRequestScalarFieldEnum[]
  }

  /**
   * AccessRequest findFirstOrThrow
   */
  export type AccessRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessRequest
     */
    select?: AccessRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessRequest
     */
    omit?: AccessRequestOmit<ExtArgs> | null
    /**
     * Filter, which AccessRequest to fetch.
     */
    where?: AccessRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessRequests to fetch.
     */
    orderBy?: AccessRequestOrderByWithRelationInput | AccessRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccessRequests.
     */
    cursor?: AccessRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccessRequests.
     */
    distinct?: AccessRequestScalarFieldEnum | AccessRequestScalarFieldEnum[]
  }

  /**
   * AccessRequest findMany
   */
  export type AccessRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessRequest
     */
    select?: AccessRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessRequest
     */
    omit?: AccessRequestOmit<ExtArgs> | null
    /**
     * Filter, which AccessRequests to fetch.
     */
    where?: AccessRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessRequests to fetch.
     */
    orderBy?: AccessRequestOrderByWithRelationInput | AccessRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AccessRequests.
     */
    cursor?: AccessRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessRequests.
     */
    skip?: number
    distinct?: AccessRequestScalarFieldEnum | AccessRequestScalarFieldEnum[]
  }

  /**
   * AccessRequest create
   */
  export type AccessRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessRequest
     */
    select?: AccessRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessRequest
     */
    omit?: AccessRequestOmit<ExtArgs> | null
    /**
     * The data needed to create a AccessRequest.
     */
    data: XOR<AccessRequestCreateInput, AccessRequestUncheckedCreateInput>
  }

  /**
   * AccessRequest createMany
   */
  export type AccessRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AccessRequests.
     */
    data: AccessRequestCreateManyInput | AccessRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AccessRequest createManyAndReturn
   */
  export type AccessRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessRequest
     */
    select?: AccessRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AccessRequest
     */
    omit?: AccessRequestOmit<ExtArgs> | null
    /**
     * The data used to create many AccessRequests.
     */
    data: AccessRequestCreateManyInput | AccessRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AccessRequest update
   */
  export type AccessRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessRequest
     */
    select?: AccessRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessRequest
     */
    omit?: AccessRequestOmit<ExtArgs> | null
    /**
     * The data needed to update a AccessRequest.
     */
    data: XOR<AccessRequestUpdateInput, AccessRequestUncheckedUpdateInput>
    /**
     * Choose, which AccessRequest to update.
     */
    where: AccessRequestWhereUniqueInput
  }

  /**
   * AccessRequest updateMany
   */
  export type AccessRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AccessRequests.
     */
    data: XOR<AccessRequestUpdateManyMutationInput, AccessRequestUncheckedUpdateManyInput>
    /**
     * Filter which AccessRequests to update
     */
    where?: AccessRequestWhereInput
    /**
     * Limit how many AccessRequests to update.
     */
    limit?: number
  }

  /**
   * AccessRequest updateManyAndReturn
   */
  export type AccessRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessRequest
     */
    select?: AccessRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AccessRequest
     */
    omit?: AccessRequestOmit<ExtArgs> | null
    /**
     * The data used to update AccessRequests.
     */
    data: XOR<AccessRequestUpdateManyMutationInput, AccessRequestUncheckedUpdateManyInput>
    /**
     * Filter which AccessRequests to update
     */
    where?: AccessRequestWhereInput
    /**
     * Limit how many AccessRequests to update.
     */
    limit?: number
  }

  /**
   * AccessRequest upsert
   */
  export type AccessRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessRequest
     */
    select?: AccessRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessRequest
     */
    omit?: AccessRequestOmit<ExtArgs> | null
    /**
     * The filter to search for the AccessRequest to update in case it exists.
     */
    where: AccessRequestWhereUniqueInput
    /**
     * In case the AccessRequest found by the `where` argument doesn't exist, create a new AccessRequest with this data.
     */
    create: XOR<AccessRequestCreateInput, AccessRequestUncheckedCreateInput>
    /**
     * In case the AccessRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccessRequestUpdateInput, AccessRequestUncheckedUpdateInput>
  }

  /**
   * AccessRequest delete
   */
  export type AccessRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessRequest
     */
    select?: AccessRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessRequest
     */
    omit?: AccessRequestOmit<ExtArgs> | null
    /**
     * Filter which AccessRequest to delete.
     */
    where: AccessRequestWhereUniqueInput
  }

  /**
   * AccessRequest deleteMany
   */
  export type AccessRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AccessRequests to delete
     */
    where?: AccessRequestWhereInput
    /**
     * Limit how many AccessRequests to delete.
     */
    limit?: number
  }

  /**
   * AccessRequest without action
   */
  export type AccessRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessRequest
     */
    select?: AccessRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessRequest
     */
    omit?: AccessRequestOmit<ExtArgs> | null
  }


  /**
   * Model AuditEvent
   */

  export type AggregateAuditEvent = {
    _count: AuditEventCountAggregateOutputType | null
    _avg: AuditEventAvgAggregateOutputType | null
    _sum: AuditEventSumAggregateOutputType | null
    _min: AuditEventMinAggregateOutputType | null
    _max: AuditEventMaxAggregateOutputType | null
  }

  export type AuditEventAvgAggregateOutputType = {
    id: number | null
  }

  export type AuditEventSumAggregateOutputType = {
    id: number | null
  }

  export type AuditEventMinAggregateOutputType = {
    id: number | null
    action: string | null
    actorPubkey: string | null
    recordCid: string | null
    targetPubkey: string | null
    metadata: string | null
    ipAddress: string | null
    txSignature: string | null
    createdAt: Date | null
  }

  export type AuditEventMaxAggregateOutputType = {
    id: number | null
    action: string | null
    actorPubkey: string | null
    recordCid: string | null
    targetPubkey: string | null
    metadata: string | null
    ipAddress: string | null
    txSignature: string | null
    createdAt: Date | null
  }

  export type AuditEventCountAggregateOutputType = {
    id: number
    action: number
    actorPubkey: number
    recordCid: number
    targetPubkey: number
    metadata: number
    ipAddress: number
    txSignature: number
    createdAt: number
    _all: number
  }


  export type AuditEventAvgAggregateInputType = {
    id?: true
  }

  export type AuditEventSumAggregateInputType = {
    id?: true
  }

  export type AuditEventMinAggregateInputType = {
    id?: true
    action?: true
    actorPubkey?: true
    recordCid?: true
    targetPubkey?: true
    metadata?: true
    ipAddress?: true
    txSignature?: true
    createdAt?: true
  }

  export type AuditEventMaxAggregateInputType = {
    id?: true
    action?: true
    actorPubkey?: true
    recordCid?: true
    targetPubkey?: true
    metadata?: true
    ipAddress?: true
    txSignature?: true
    createdAt?: true
  }

  export type AuditEventCountAggregateInputType = {
    id?: true
    action?: true
    actorPubkey?: true
    recordCid?: true
    targetPubkey?: true
    metadata?: true
    ipAddress?: true
    txSignature?: true
    createdAt?: true
    _all?: true
  }

  export type AuditEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditEvent to aggregate.
     */
    where?: AuditEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditEvents to fetch.
     */
    orderBy?: AuditEventOrderByWithRelationInput | AuditEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditEvents
    **/
    _count?: true | AuditEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuditEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuditEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditEventMaxAggregateInputType
  }

  export type GetAuditEventAggregateType<T extends AuditEventAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditEvent[P]>
      : GetScalarType<T[P], AggregateAuditEvent[P]>
  }




  export type AuditEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditEventWhereInput
    orderBy?: AuditEventOrderByWithAggregationInput | AuditEventOrderByWithAggregationInput[]
    by: AuditEventScalarFieldEnum[] | AuditEventScalarFieldEnum
    having?: AuditEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditEventCountAggregateInputType | true
    _avg?: AuditEventAvgAggregateInputType
    _sum?: AuditEventSumAggregateInputType
    _min?: AuditEventMinAggregateInputType
    _max?: AuditEventMaxAggregateInputType
  }

  export type AuditEventGroupByOutputType = {
    id: number
    action: string
    actorPubkey: string
    recordCid: string | null
    targetPubkey: string | null
    metadata: string | null
    ipAddress: string | null
    txSignature: string | null
    createdAt: Date
    _count: AuditEventCountAggregateOutputType | null
    _avg: AuditEventAvgAggregateOutputType | null
    _sum: AuditEventSumAggregateOutputType | null
    _min: AuditEventMinAggregateOutputType | null
    _max: AuditEventMaxAggregateOutputType | null
  }

  type GetAuditEventGroupByPayload<T extends AuditEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditEventGroupByOutputType[P]>
            : GetScalarType<T[P], AuditEventGroupByOutputType[P]>
        }
      >
    >


  export type AuditEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    actorPubkey?: boolean
    recordCid?: boolean
    targetPubkey?: boolean
    metadata?: boolean
    ipAddress?: boolean
    txSignature?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditEvent"]>

  export type AuditEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    actorPubkey?: boolean
    recordCid?: boolean
    targetPubkey?: boolean
    metadata?: boolean
    ipAddress?: boolean
    txSignature?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditEvent"]>

  export type AuditEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    actorPubkey?: boolean
    recordCid?: boolean
    targetPubkey?: boolean
    metadata?: boolean
    ipAddress?: boolean
    txSignature?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditEvent"]>

  export type AuditEventSelectScalar = {
    id?: boolean
    action?: boolean
    actorPubkey?: boolean
    recordCid?: boolean
    targetPubkey?: boolean
    metadata?: boolean
    ipAddress?: boolean
    txSignature?: boolean
    createdAt?: boolean
  }

  export type AuditEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "action" | "actorPubkey" | "recordCid" | "targetPubkey" | "metadata" | "ipAddress" | "txSignature" | "createdAt", ExtArgs["result"]["auditEvent"]>

  export type $AuditEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      action: string
      actorPubkey: string
      recordCid: string | null
      targetPubkey: string | null
      metadata: string | null
      ipAddress: string | null
      txSignature: string | null
      createdAt: Date
    }, ExtArgs["result"]["auditEvent"]>
    composites: {}
  }

  type AuditEventGetPayload<S extends boolean | null | undefined | AuditEventDefaultArgs> = $Result.GetResult<Prisma.$AuditEventPayload, S>

  type AuditEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditEventCountAggregateInputType | true
    }

  export interface AuditEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditEvent'], meta: { name: 'AuditEvent' } }
    /**
     * Find zero or one AuditEvent that matches the filter.
     * @param {AuditEventFindUniqueArgs} args - Arguments to find a AuditEvent
     * @example
     * // Get one AuditEvent
     * const auditEvent = await prisma.auditEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditEventFindUniqueArgs>(args: SelectSubset<T, AuditEventFindUniqueArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditEventFindUniqueOrThrowArgs} args - Arguments to find a AuditEvent
     * @example
     * // Get one AuditEvent
     * const auditEvent = await prisma.auditEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditEventFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventFindFirstArgs} args - Arguments to find a AuditEvent
     * @example
     * // Get one AuditEvent
     * const auditEvent = await prisma.auditEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditEventFindFirstArgs>(args?: SelectSubset<T, AuditEventFindFirstArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventFindFirstOrThrowArgs} args - Arguments to find a AuditEvent
     * @example
     * // Get one AuditEvent
     * const auditEvent = await prisma.auditEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditEventFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditEvents
     * const auditEvents = await prisma.auditEvent.findMany()
     * 
     * // Get first 10 AuditEvents
     * const auditEvents = await prisma.auditEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditEventWithIdOnly = await prisma.auditEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditEventFindManyArgs>(args?: SelectSubset<T, AuditEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditEvent.
     * @param {AuditEventCreateArgs} args - Arguments to create a AuditEvent.
     * @example
     * // Create one AuditEvent
     * const AuditEvent = await prisma.auditEvent.create({
     *   data: {
     *     // ... data to create a AuditEvent
     *   }
     * })
     * 
     */
    create<T extends AuditEventCreateArgs>(args: SelectSubset<T, AuditEventCreateArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditEvents.
     * @param {AuditEventCreateManyArgs} args - Arguments to create many AuditEvents.
     * @example
     * // Create many AuditEvents
     * const auditEvent = await prisma.auditEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditEventCreateManyArgs>(args?: SelectSubset<T, AuditEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditEvents and returns the data saved in the database.
     * @param {AuditEventCreateManyAndReturnArgs} args - Arguments to create many AuditEvents.
     * @example
     * // Create many AuditEvents
     * const auditEvent = await prisma.auditEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditEvents and only return the `id`
     * const auditEventWithIdOnly = await prisma.auditEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditEventCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditEvent.
     * @param {AuditEventDeleteArgs} args - Arguments to delete one AuditEvent.
     * @example
     * // Delete one AuditEvent
     * const AuditEvent = await prisma.auditEvent.delete({
     *   where: {
     *     // ... filter to delete one AuditEvent
     *   }
     * })
     * 
     */
    delete<T extends AuditEventDeleteArgs>(args: SelectSubset<T, AuditEventDeleteArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditEvent.
     * @param {AuditEventUpdateArgs} args - Arguments to update one AuditEvent.
     * @example
     * // Update one AuditEvent
     * const auditEvent = await prisma.auditEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditEventUpdateArgs>(args: SelectSubset<T, AuditEventUpdateArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditEvents.
     * @param {AuditEventDeleteManyArgs} args - Arguments to filter AuditEvents to delete.
     * @example
     * // Delete a few AuditEvents
     * const { count } = await prisma.auditEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditEventDeleteManyArgs>(args?: SelectSubset<T, AuditEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditEvents
     * const auditEvent = await prisma.auditEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditEventUpdateManyArgs>(args: SelectSubset<T, AuditEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditEvents and returns the data updated in the database.
     * @param {AuditEventUpdateManyAndReturnArgs} args - Arguments to update many AuditEvents.
     * @example
     * // Update many AuditEvents
     * const auditEvent = await prisma.auditEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditEvents and only return the `id`
     * const auditEventWithIdOnly = await prisma.auditEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditEventUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditEvent.
     * @param {AuditEventUpsertArgs} args - Arguments to update or create a AuditEvent.
     * @example
     * // Update or create a AuditEvent
     * const auditEvent = await prisma.auditEvent.upsert({
     *   create: {
     *     // ... data to create a AuditEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditEvent we want to update
     *   }
     * })
     */
    upsert<T extends AuditEventUpsertArgs>(args: SelectSubset<T, AuditEventUpsertArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventCountArgs} args - Arguments to filter AuditEvents to count.
     * @example
     * // Count the number of AuditEvents
     * const count = await prisma.auditEvent.count({
     *   where: {
     *     // ... the filter for the AuditEvents we want to count
     *   }
     * })
    **/
    count<T extends AuditEventCountArgs>(
      args?: Subset<T, AuditEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditEventAggregateArgs>(args: Subset<T, AuditEventAggregateArgs>): Prisma.PrismaPromise<GetAuditEventAggregateType<T>>

    /**
     * Group by AuditEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditEventGroupByArgs['orderBy'] }
        : { orderBy?: AuditEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditEvent model
   */
  readonly fields: AuditEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditEvent model
   */
  interface AuditEventFieldRefs {
    readonly id: FieldRef<"AuditEvent", 'Int'>
    readonly action: FieldRef<"AuditEvent", 'String'>
    readonly actorPubkey: FieldRef<"AuditEvent", 'String'>
    readonly recordCid: FieldRef<"AuditEvent", 'String'>
    readonly targetPubkey: FieldRef<"AuditEvent", 'String'>
    readonly metadata: FieldRef<"AuditEvent", 'String'>
    readonly ipAddress: FieldRef<"AuditEvent", 'String'>
    readonly txSignature: FieldRef<"AuditEvent", 'String'>
    readonly createdAt: FieldRef<"AuditEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditEvent findUnique
   */
  export type AuditEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Filter, which AuditEvent to fetch.
     */
    where: AuditEventWhereUniqueInput
  }

  /**
   * AuditEvent findUniqueOrThrow
   */
  export type AuditEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Filter, which AuditEvent to fetch.
     */
    where: AuditEventWhereUniqueInput
  }

  /**
   * AuditEvent findFirst
   */
  export type AuditEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Filter, which AuditEvent to fetch.
     */
    where?: AuditEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditEvents to fetch.
     */
    orderBy?: AuditEventOrderByWithRelationInput | AuditEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditEvents.
     */
    cursor?: AuditEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditEvents.
     */
    distinct?: AuditEventScalarFieldEnum | AuditEventScalarFieldEnum[]
  }

  /**
   * AuditEvent findFirstOrThrow
   */
  export type AuditEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Filter, which AuditEvent to fetch.
     */
    where?: AuditEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditEvents to fetch.
     */
    orderBy?: AuditEventOrderByWithRelationInput | AuditEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditEvents.
     */
    cursor?: AuditEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditEvents.
     */
    distinct?: AuditEventScalarFieldEnum | AuditEventScalarFieldEnum[]
  }

  /**
   * AuditEvent findMany
   */
  export type AuditEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Filter, which AuditEvents to fetch.
     */
    where?: AuditEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditEvents to fetch.
     */
    orderBy?: AuditEventOrderByWithRelationInput | AuditEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditEvents.
     */
    cursor?: AuditEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditEvents.
     */
    skip?: number
    distinct?: AuditEventScalarFieldEnum | AuditEventScalarFieldEnum[]
  }

  /**
   * AuditEvent create
   */
  export type AuditEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * The data needed to create a AuditEvent.
     */
    data: XOR<AuditEventCreateInput, AuditEventUncheckedCreateInput>
  }

  /**
   * AuditEvent createMany
   */
  export type AuditEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditEvents.
     */
    data: AuditEventCreateManyInput | AuditEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditEvent createManyAndReturn
   */
  export type AuditEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * The data used to create many AuditEvents.
     */
    data: AuditEventCreateManyInput | AuditEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditEvent update
   */
  export type AuditEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * The data needed to update a AuditEvent.
     */
    data: XOR<AuditEventUpdateInput, AuditEventUncheckedUpdateInput>
    /**
     * Choose, which AuditEvent to update.
     */
    where: AuditEventWhereUniqueInput
  }

  /**
   * AuditEvent updateMany
   */
  export type AuditEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditEvents.
     */
    data: XOR<AuditEventUpdateManyMutationInput, AuditEventUncheckedUpdateManyInput>
    /**
     * Filter which AuditEvents to update
     */
    where?: AuditEventWhereInput
    /**
     * Limit how many AuditEvents to update.
     */
    limit?: number
  }

  /**
   * AuditEvent updateManyAndReturn
   */
  export type AuditEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * The data used to update AuditEvents.
     */
    data: XOR<AuditEventUpdateManyMutationInput, AuditEventUncheckedUpdateManyInput>
    /**
     * Filter which AuditEvents to update
     */
    where?: AuditEventWhereInput
    /**
     * Limit how many AuditEvents to update.
     */
    limit?: number
  }

  /**
   * AuditEvent upsert
   */
  export type AuditEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * The filter to search for the AuditEvent to update in case it exists.
     */
    where: AuditEventWhereUniqueInput
    /**
     * In case the AuditEvent found by the `where` argument doesn't exist, create a new AuditEvent with this data.
     */
    create: XOR<AuditEventCreateInput, AuditEventUncheckedCreateInput>
    /**
     * In case the AuditEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditEventUpdateInput, AuditEventUncheckedUpdateInput>
  }

  /**
   * AuditEvent delete
   */
  export type AuditEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Filter which AuditEvent to delete.
     */
    where: AuditEventWhereUniqueInput
  }

  /**
   * AuditEvent deleteMany
   */
  export type AuditEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditEvents to delete
     */
    where?: AuditEventWhereInput
    /**
     * Limit how many AuditEvents to delete.
     */
    limit?: number
  }

  /**
   * AuditEvent without action
   */
  export type AuditEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
  }


  /**
   * Model MerkleLeaf
   */

  export type AggregateMerkleLeaf = {
    _count: MerkleLeafCountAggregateOutputType | null
    _avg: MerkleLeafAvgAggregateOutputType | null
    _sum: MerkleLeafSumAggregateOutputType | null
    _min: MerkleLeafMinAggregateOutputType | null
    _max: MerkleLeafMaxAggregateOutputType | null
  }

  export type MerkleLeafAvgAggregateOutputType = {
    id: number | null
    leafIndex: number | null
  }

  export type MerkleLeafSumAggregateOutputType = {
    id: number | null
    leafIndex: number | null
  }

  export type MerkleLeafMinAggregateOutputType = {
    id: number | null
    ownerPubkey: string | null
    recordCid: string | null
    leafHash: string | null
    leafIndex: number | null
    createdAt: Date | null
  }

  export type MerkleLeafMaxAggregateOutputType = {
    id: number | null
    ownerPubkey: string | null
    recordCid: string | null
    leafHash: string | null
    leafIndex: number | null
    createdAt: Date | null
  }

  export type MerkleLeafCountAggregateOutputType = {
    id: number
    ownerPubkey: number
    recordCid: number
    leafHash: number
    leafIndex: number
    createdAt: number
    _all: number
  }


  export type MerkleLeafAvgAggregateInputType = {
    id?: true
    leafIndex?: true
  }

  export type MerkleLeafSumAggregateInputType = {
    id?: true
    leafIndex?: true
  }

  export type MerkleLeafMinAggregateInputType = {
    id?: true
    ownerPubkey?: true
    recordCid?: true
    leafHash?: true
    leafIndex?: true
    createdAt?: true
  }

  export type MerkleLeafMaxAggregateInputType = {
    id?: true
    ownerPubkey?: true
    recordCid?: true
    leafHash?: true
    leafIndex?: true
    createdAt?: true
  }

  export type MerkleLeafCountAggregateInputType = {
    id?: true
    ownerPubkey?: true
    recordCid?: true
    leafHash?: true
    leafIndex?: true
    createdAt?: true
    _all?: true
  }

  export type MerkleLeafAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MerkleLeaf to aggregate.
     */
    where?: MerkleLeafWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MerkleLeaves to fetch.
     */
    orderBy?: MerkleLeafOrderByWithRelationInput | MerkleLeafOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MerkleLeafWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MerkleLeaves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MerkleLeaves.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MerkleLeaves
    **/
    _count?: true | MerkleLeafCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MerkleLeafAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MerkleLeafSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MerkleLeafMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MerkleLeafMaxAggregateInputType
  }

  export type GetMerkleLeafAggregateType<T extends MerkleLeafAggregateArgs> = {
        [P in keyof T & keyof AggregateMerkleLeaf]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMerkleLeaf[P]>
      : GetScalarType<T[P], AggregateMerkleLeaf[P]>
  }




  export type MerkleLeafGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MerkleLeafWhereInput
    orderBy?: MerkleLeafOrderByWithAggregationInput | MerkleLeafOrderByWithAggregationInput[]
    by: MerkleLeafScalarFieldEnum[] | MerkleLeafScalarFieldEnum
    having?: MerkleLeafScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MerkleLeafCountAggregateInputType | true
    _avg?: MerkleLeafAvgAggregateInputType
    _sum?: MerkleLeafSumAggregateInputType
    _min?: MerkleLeafMinAggregateInputType
    _max?: MerkleLeafMaxAggregateInputType
  }

  export type MerkleLeafGroupByOutputType = {
    id: number
    ownerPubkey: string
    recordCid: string
    leafHash: string
    leafIndex: number | null
    createdAt: Date
    _count: MerkleLeafCountAggregateOutputType | null
    _avg: MerkleLeafAvgAggregateOutputType | null
    _sum: MerkleLeafSumAggregateOutputType | null
    _min: MerkleLeafMinAggregateOutputType | null
    _max: MerkleLeafMaxAggregateOutputType | null
  }

  type GetMerkleLeafGroupByPayload<T extends MerkleLeafGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MerkleLeafGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MerkleLeafGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MerkleLeafGroupByOutputType[P]>
            : GetScalarType<T[P], MerkleLeafGroupByOutputType[P]>
        }
      >
    >


  export type MerkleLeafSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerPubkey?: boolean
    recordCid?: boolean
    leafHash?: boolean
    leafIndex?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["merkleLeaf"]>

  export type MerkleLeafSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerPubkey?: boolean
    recordCid?: boolean
    leafHash?: boolean
    leafIndex?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["merkleLeaf"]>

  export type MerkleLeafSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerPubkey?: boolean
    recordCid?: boolean
    leafHash?: boolean
    leafIndex?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["merkleLeaf"]>

  export type MerkleLeafSelectScalar = {
    id?: boolean
    ownerPubkey?: boolean
    recordCid?: boolean
    leafHash?: boolean
    leafIndex?: boolean
    createdAt?: boolean
  }

  export type MerkleLeafOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ownerPubkey" | "recordCid" | "leafHash" | "leafIndex" | "createdAt", ExtArgs["result"]["merkleLeaf"]>

  export type $MerkleLeafPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MerkleLeaf"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      ownerPubkey: string
      recordCid: string
      leafHash: string
      leafIndex: number | null
      createdAt: Date
    }, ExtArgs["result"]["merkleLeaf"]>
    composites: {}
  }

  type MerkleLeafGetPayload<S extends boolean | null | undefined | MerkleLeafDefaultArgs> = $Result.GetResult<Prisma.$MerkleLeafPayload, S>

  type MerkleLeafCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MerkleLeafFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MerkleLeafCountAggregateInputType | true
    }

  export interface MerkleLeafDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MerkleLeaf'], meta: { name: 'MerkleLeaf' } }
    /**
     * Find zero or one MerkleLeaf that matches the filter.
     * @param {MerkleLeafFindUniqueArgs} args - Arguments to find a MerkleLeaf
     * @example
     * // Get one MerkleLeaf
     * const merkleLeaf = await prisma.merkleLeaf.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MerkleLeafFindUniqueArgs>(args: SelectSubset<T, MerkleLeafFindUniqueArgs<ExtArgs>>): Prisma__MerkleLeafClient<$Result.GetResult<Prisma.$MerkleLeafPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MerkleLeaf that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MerkleLeafFindUniqueOrThrowArgs} args - Arguments to find a MerkleLeaf
     * @example
     * // Get one MerkleLeaf
     * const merkleLeaf = await prisma.merkleLeaf.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MerkleLeafFindUniqueOrThrowArgs>(args: SelectSubset<T, MerkleLeafFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MerkleLeafClient<$Result.GetResult<Prisma.$MerkleLeafPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MerkleLeaf that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerkleLeafFindFirstArgs} args - Arguments to find a MerkleLeaf
     * @example
     * // Get one MerkleLeaf
     * const merkleLeaf = await prisma.merkleLeaf.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MerkleLeafFindFirstArgs>(args?: SelectSubset<T, MerkleLeafFindFirstArgs<ExtArgs>>): Prisma__MerkleLeafClient<$Result.GetResult<Prisma.$MerkleLeafPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MerkleLeaf that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerkleLeafFindFirstOrThrowArgs} args - Arguments to find a MerkleLeaf
     * @example
     * // Get one MerkleLeaf
     * const merkleLeaf = await prisma.merkleLeaf.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MerkleLeafFindFirstOrThrowArgs>(args?: SelectSubset<T, MerkleLeafFindFirstOrThrowArgs<ExtArgs>>): Prisma__MerkleLeafClient<$Result.GetResult<Prisma.$MerkleLeafPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MerkleLeaves that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerkleLeafFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MerkleLeaves
     * const merkleLeaves = await prisma.merkleLeaf.findMany()
     * 
     * // Get first 10 MerkleLeaves
     * const merkleLeaves = await prisma.merkleLeaf.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const merkleLeafWithIdOnly = await prisma.merkleLeaf.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MerkleLeafFindManyArgs>(args?: SelectSubset<T, MerkleLeafFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MerkleLeafPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MerkleLeaf.
     * @param {MerkleLeafCreateArgs} args - Arguments to create a MerkleLeaf.
     * @example
     * // Create one MerkleLeaf
     * const MerkleLeaf = await prisma.merkleLeaf.create({
     *   data: {
     *     // ... data to create a MerkleLeaf
     *   }
     * })
     * 
     */
    create<T extends MerkleLeafCreateArgs>(args: SelectSubset<T, MerkleLeafCreateArgs<ExtArgs>>): Prisma__MerkleLeafClient<$Result.GetResult<Prisma.$MerkleLeafPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MerkleLeaves.
     * @param {MerkleLeafCreateManyArgs} args - Arguments to create many MerkleLeaves.
     * @example
     * // Create many MerkleLeaves
     * const merkleLeaf = await prisma.merkleLeaf.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MerkleLeafCreateManyArgs>(args?: SelectSubset<T, MerkleLeafCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MerkleLeaves and returns the data saved in the database.
     * @param {MerkleLeafCreateManyAndReturnArgs} args - Arguments to create many MerkleLeaves.
     * @example
     * // Create many MerkleLeaves
     * const merkleLeaf = await prisma.merkleLeaf.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MerkleLeaves and only return the `id`
     * const merkleLeafWithIdOnly = await prisma.merkleLeaf.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MerkleLeafCreateManyAndReturnArgs>(args?: SelectSubset<T, MerkleLeafCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MerkleLeafPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MerkleLeaf.
     * @param {MerkleLeafDeleteArgs} args - Arguments to delete one MerkleLeaf.
     * @example
     * // Delete one MerkleLeaf
     * const MerkleLeaf = await prisma.merkleLeaf.delete({
     *   where: {
     *     // ... filter to delete one MerkleLeaf
     *   }
     * })
     * 
     */
    delete<T extends MerkleLeafDeleteArgs>(args: SelectSubset<T, MerkleLeafDeleteArgs<ExtArgs>>): Prisma__MerkleLeafClient<$Result.GetResult<Prisma.$MerkleLeafPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MerkleLeaf.
     * @param {MerkleLeafUpdateArgs} args - Arguments to update one MerkleLeaf.
     * @example
     * // Update one MerkleLeaf
     * const merkleLeaf = await prisma.merkleLeaf.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MerkleLeafUpdateArgs>(args: SelectSubset<T, MerkleLeafUpdateArgs<ExtArgs>>): Prisma__MerkleLeafClient<$Result.GetResult<Prisma.$MerkleLeafPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MerkleLeaves.
     * @param {MerkleLeafDeleteManyArgs} args - Arguments to filter MerkleLeaves to delete.
     * @example
     * // Delete a few MerkleLeaves
     * const { count } = await prisma.merkleLeaf.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MerkleLeafDeleteManyArgs>(args?: SelectSubset<T, MerkleLeafDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MerkleLeaves.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerkleLeafUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MerkleLeaves
     * const merkleLeaf = await prisma.merkleLeaf.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MerkleLeafUpdateManyArgs>(args: SelectSubset<T, MerkleLeafUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MerkleLeaves and returns the data updated in the database.
     * @param {MerkleLeafUpdateManyAndReturnArgs} args - Arguments to update many MerkleLeaves.
     * @example
     * // Update many MerkleLeaves
     * const merkleLeaf = await prisma.merkleLeaf.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MerkleLeaves and only return the `id`
     * const merkleLeafWithIdOnly = await prisma.merkleLeaf.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MerkleLeafUpdateManyAndReturnArgs>(args: SelectSubset<T, MerkleLeafUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MerkleLeafPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MerkleLeaf.
     * @param {MerkleLeafUpsertArgs} args - Arguments to update or create a MerkleLeaf.
     * @example
     * // Update or create a MerkleLeaf
     * const merkleLeaf = await prisma.merkleLeaf.upsert({
     *   create: {
     *     // ... data to create a MerkleLeaf
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MerkleLeaf we want to update
     *   }
     * })
     */
    upsert<T extends MerkleLeafUpsertArgs>(args: SelectSubset<T, MerkleLeafUpsertArgs<ExtArgs>>): Prisma__MerkleLeafClient<$Result.GetResult<Prisma.$MerkleLeafPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MerkleLeaves.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerkleLeafCountArgs} args - Arguments to filter MerkleLeaves to count.
     * @example
     * // Count the number of MerkleLeaves
     * const count = await prisma.merkleLeaf.count({
     *   where: {
     *     // ... the filter for the MerkleLeaves we want to count
     *   }
     * })
    **/
    count<T extends MerkleLeafCountArgs>(
      args?: Subset<T, MerkleLeafCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MerkleLeafCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MerkleLeaf.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerkleLeafAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MerkleLeafAggregateArgs>(args: Subset<T, MerkleLeafAggregateArgs>): Prisma.PrismaPromise<GetMerkleLeafAggregateType<T>>

    /**
     * Group by MerkleLeaf.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MerkleLeafGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MerkleLeafGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MerkleLeafGroupByArgs['orderBy'] }
        : { orderBy?: MerkleLeafGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MerkleLeafGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMerkleLeafGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MerkleLeaf model
   */
  readonly fields: MerkleLeafFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MerkleLeaf.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MerkleLeafClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MerkleLeaf model
   */
  interface MerkleLeafFieldRefs {
    readonly id: FieldRef<"MerkleLeaf", 'Int'>
    readonly ownerPubkey: FieldRef<"MerkleLeaf", 'String'>
    readonly recordCid: FieldRef<"MerkleLeaf", 'String'>
    readonly leafHash: FieldRef<"MerkleLeaf", 'String'>
    readonly leafIndex: FieldRef<"MerkleLeaf", 'Int'>
    readonly createdAt: FieldRef<"MerkleLeaf", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MerkleLeaf findUnique
   */
  export type MerkleLeafFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerkleLeaf
     */
    select?: MerkleLeafSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerkleLeaf
     */
    omit?: MerkleLeafOmit<ExtArgs> | null
    /**
     * Filter, which MerkleLeaf to fetch.
     */
    where: MerkleLeafWhereUniqueInput
  }

  /**
   * MerkleLeaf findUniqueOrThrow
   */
  export type MerkleLeafFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerkleLeaf
     */
    select?: MerkleLeafSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerkleLeaf
     */
    omit?: MerkleLeafOmit<ExtArgs> | null
    /**
     * Filter, which MerkleLeaf to fetch.
     */
    where: MerkleLeafWhereUniqueInput
  }

  /**
   * MerkleLeaf findFirst
   */
  export type MerkleLeafFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerkleLeaf
     */
    select?: MerkleLeafSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerkleLeaf
     */
    omit?: MerkleLeafOmit<ExtArgs> | null
    /**
     * Filter, which MerkleLeaf to fetch.
     */
    where?: MerkleLeafWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MerkleLeaves to fetch.
     */
    orderBy?: MerkleLeafOrderByWithRelationInput | MerkleLeafOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MerkleLeaves.
     */
    cursor?: MerkleLeafWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MerkleLeaves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MerkleLeaves.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MerkleLeaves.
     */
    distinct?: MerkleLeafScalarFieldEnum | MerkleLeafScalarFieldEnum[]
  }

  /**
   * MerkleLeaf findFirstOrThrow
   */
  export type MerkleLeafFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerkleLeaf
     */
    select?: MerkleLeafSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerkleLeaf
     */
    omit?: MerkleLeafOmit<ExtArgs> | null
    /**
     * Filter, which MerkleLeaf to fetch.
     */
    where?: MerkleLeafWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MerkleLeaves to fetch.
     */
    orderBy?: MerkleLeafOrderByWithRelationInput | MerkleLeafOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MerkleLeaves.
     */
    cursor?: MerkleLeafWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MerkleLeaves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MerkleLeaves.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MerkleLeaves.
     */
    distinct?: MerkleLeafScalarFieldEnum | MerkleLeafScalarFieldEnum[]
  }

  /**
   * MerkleLeaf findMany
   */
  export type MerkleLeafFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerkleLeaf
     */
    select?: MerkleLeafSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerkleLeaf
     */
    omit?: MerkleLeafOmit<ExtArgs> | null
    /**
     * Filter, which MerkleLeaves to fetch.
     */
    where?: MerkleLeafWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MerkleLeaves to fetch.
     */
    orderBy?: MerkleLeafOrderByWithRelationInput | MerkleLeafOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MerkleLeaves.
     */
    cursor?: MerkleLeafWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MerkleLeaves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MerkleLeaves.
     */
    skip?: number
    distinct?: MerkleLeafScalarFieldEnum | MerkleLeafScalarFieldEnum[]
  }

  /**
   * MerkleLeaf create
   */
  export type MerkleLeafCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerkleLeaf
     */
    select?: MerkleLeafSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerkleLeaf
     */
    omit?: MerkleLeafOmit<ExtArgs> | null
    /**
     * The data needed to create a MerkleLeaf.
     */
    data: XOR<MerkleLeafCreateInput, MerkleLeafUncheckedCreateInput>
  }

  /**
   * MerkleLeaf createMany
   */
  export type MerkleLeafCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MerkleLeaves.
     */
    data: MerkleLeafCreateManyInput | MerkleLeafCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MerkleLeaf createManyAndReturn
   */
  export type MerkleLeafCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerkleLeaf
     */
    select?: MerkleLeafSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MerkleLeaf
     */
    omit?: MerkleLeafOmit<ExtArgs> | null
    /**
     * The data used to create many MerkleLeaves.
     */
    data: MerkleLeafCreateManyInput | MerkleLeafCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MerkleLeaf update
   */
  export type MerkleLeafUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerkleLeaf
     */
    select?: MerkleLeafSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerkleLeaf
     */
    omit?: MerkleLeafOmit<ExtArgs> | null
    /**
     * The data needed to update a MerkleLeaf.
     */
    data: XOR<MerkleLeafUpdateInput, MerkleLeafUncheckedUpdateInput>
    /**
     * Choose, which MerkleLeaf to update.
     */
    where: MerkleLeafWhereUniqueInput
  }

  /**
   * MerkleLeaf updateMany
   */
  export type MerkleLeafUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MerkleLeaves.
     */
    data: XOR<MerkleLeafUpdateManyMutationInput, MerkleLeafUncheckedUpdateManyInput>
    /**
     * Filter which MerkleLeaves to update
     */
    where?: MerkleLeafWhereInput
    /**
     * Limit how many MerkleLeaves to update.
     */
    limit?: number
  }

  /**
   * MerkleLeaf updateManyAndReturn
   */
  export type MerkleLeafUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerkleLeaf
     */
    select?: MerkleLeafSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MerkleLeaf
     */
    omit?: MerkleLeafOmit<ExtArgs> | null
    /**
     * The data used to update MerkleLeaves.
     */
    data: XOR<MerkleLeafUpdateManyMutationInput, MerkleLeafUncheckedUpdateManyInput>
    /**
     * Filter which MerkleLeaves to update
     */
    where?: MerkleLeafWhereInput
    /**
     * Limit how many MerkleLeaves to update.
     */
    limit?: number
  }

  /**
   * MerkleLeaf upsert
   */
  export type MerkleLeafUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerkleLeaf
     */
    select?: MerkleLeafSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerkleLeaf
     */
    omit?: MerkleLeafOmit<ExtArgs> | null
    /**
     * The filter to search for the MerkleLeaf to update in case it exists.
     */
    where: MerkleLeafWhereUniqueInput
    /**
     * In case the MerkleLeaf found by the `where` argument doesn't exist, create a new MerkleLeaf with this data.
     */
    create: XOR<MerkleLeafCreateInput, MerkleLeafUncheckedCreateInput>
    /**
     * In case the MerkleLeaf was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MerkleLeafUpdateInput, MerkleLeafUncheckedUpdateInput>
  }

  /**
   * MerkleLeaf delete
   */
  export type MerkleLeafDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerkleLeaf
     */
    select?: MerkleLeafSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerkleLeaf
     */
    omit?: MerkleLeafOmit<ExtArgs> | null
    /**
     * Filter which MerkleLeaf to delete.
     */
    where: MerkleLeafWhereUniqueInput
  }

  /**
   * MerkleLeaf deleteMany
   */
  export type MerkleLeafDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MerkleLeaves to delete
     */
    where?: MerkleLeafWhereInput
    /**
     * Limit how many MerkleLeaves to delete.
     */
    limit?: number
  }

  /**
   * MerkleLeaf without action
   */
  export type MerkleLeafDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MerkleLeaf
     */
    select?: MerkleLeafSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MerkleLeaf
     */
    omit?: MerkleLeafOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const RewrapKeyScalarFieldEnum: {
    id: 'id',
    recordCid: 'recordCid',
    recipientPubkey: 'recipientPubkey',
    encryptedSymKey: 'encryptedSymKey',
    creatorPubkey: 'creatorPubkey',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt',
    accessCount: 'accessCount',
    lastAccessedAt: 'lastAccessedAt'
  };

  export type RewrapKeyScalarFieldEnum = (typeof RewrapKeyScalarFieldEnum)[keyof typeof RewrapKeyScalarFieldEnum]


  export const AccessLogScalarFieldEnum: {
    id: 'id',
    recordCid: 'recordCid',
    recipientPubkey: 'recipientPubkey',
    rewrapKeyId: 'rewrapKeyId',
    success: 'success',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    errorMessage: 'errorMessage',
    accessedAt: 'accessedAt'
  };

  export type AccessLogScalarFieldEnum = (typeof AccessLogScalarFieldEnum)[keyof typeof AccessLogScalarFieldEnum]


  export const AdminScalarFieldEnum: {
    id: 'id',
    pubkey: 'pubkey',
    addedBy: 'addedBy',
    addedAt: 'addedAt',
    isActive: 'isActive'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const ConsentCredentialScalarFieldEnum: {
    id: 'id',
    consentCid: 'consentCid',
    recordCid: 'recordCid',
    issuerPubkey: 'issuerPubkey',
    recipientPubkey: 'recipientPubkey',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    revokedAt: 'revokedAt',
    revokedReason: 'revokedReason',
    anchoredTxId: 'anchoredTxId'
  };

  export type ConsentCredentialScalarFieldEnum = (typeof ConsentCredentialScalarFieldEnum)[keyof typeof ConsentCredentialScalarFieldEnum]


  export const RecordAnchorScalarFieldEnum: {
    id: 'id',
    recordCid: 'recordCid',
    txSignature: 'txSignature',
    pda: 'pda',
    anchoredBy: 'anchoredBy',
    anchoredAt: 'anchoredAt'
  };

  export type RecordAnchorScalarFieldEnum = (typeof RecordAnchorScalarFieldEnum)[keyof typeof RecordAnchorScalarFieldEnum]


  export const AccessRequestScalarFieldEnum: {
    id: 'id',
    recordCid: 'recordCid',
    requesterPubkey: 'requesterPubkey',
    ownerPubkey: 'ownerPubkey',
    purpose: 'purpose',
    status: 'status',
    respondedAt: 'respondedAt',
    responseNote: 'responseNote',
    consentId: 'consentId',
    createdAt: 'createdAt'
  };

  export type AccessRequestScalarFieldEnum = (typeof AccessRequestScalarFieldEnum)[keyof typeof AccessRequestScalarFieldEnum]


  export const AuditEventScalarFieldEnum: {
    id: 'id',
    action: 'action',
    actorPubkey: 'actorPubkey',
    recordCid: 'recordCid',
    targetPubkey: 'targetPubkey',
    metadata: 'metadata',
    ipAddress: 'ipAddress',
    txSignature: 'txSignature',
    createdAt: 'createdAt'
  };

  export type AuditEventScalarFieldEnum = (typeof AuditEventScalarFieldEnum)[keyof typeof AuditEventScalarFieldEnum]


  export const MerkleLeafScalarFieldEnum: {
    id: 'id',
    ownerPubkey: 'ownerPubkey',
    recordCid: 'recordCid',
    leafHash: 'leafHash',
    leafIndex: 'leafIndex',
    createdAt: 'createdAt'
  };

  export type MerkleLeafScalarFieldEnum = (typeof MerkleLeafScalarFieldEnum)[keyof typeof MerkleLeafScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type RewrapKeyWhereInput = {
    AND?: RewrapKeyWhereInput | RewrapKeyWhereInput[]
    OR?: RewrapKeyWhereInput[]
    NOT?: RewrapKeyWhereInput | RewrapKeyWhereInput[]
    id?: IntFilter<"RewrapKey"> | number
    recordCid?: StringFilter<"RewrapKey"> | string
    recipientPubkey?: StringFilter<"RewrapKey"> | string
    encryptedSymKey?: StringFilter<"RewrapKey"> | string
    creatorPubkey?: StringNullableFilter<"RewrapKey"> | string | null
    createdAt?: DateTimeFilter<"RewrapKey"> | Date | string
    expiresAt?: DateTimeNullableFilter<"RewrapKey"> | Date | string | null
    accessCount?: IntFilter<"RewrapKey"> | number
    lastAccessedAt?: DateTimeNullableFilter<"RewrapKey"> | Date | string | null
    accessLogs?: AccessLogListRelationFilter
  }

  export type RewrapKeyOrderByWithRelationInput = {
    id?: SortOrder
    recordCid?: SortOrder
    recipientPubkey?: SortOrder
    encryptedSymKey?: SortOrder
    creatorPubkey?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    accessCount?: SortOrder
    lastAccessedAt?: SortOrderInput | SortOrder
    accessLogs?: AccessLogOrderByRelationAggregateInput
  }

  export type RewrapKeyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    recordCid_recipientPubkey?: RewrapKeyRecordCid_recipientPubkeyCompoundUniqueInput
    AND?: RewrapKeyWhereInput | RewrapKeyWhereInput[]
    OR?: RewrapKeyWhereInput[]
    NOT?: RewrapKeyWhereInput | RewrapKeyWhereInput[]
    recordCid?: StringFilter<"RewrapKey"> | string
    recipientPubkey?: StringFilter<"RewrapKey"> | string
    encryptedSymKey?: StringFilter<"RewrapKey"> | string
    creatorPubkey?: StringNullableFilter<"RewrapKey"> | string | null
    createdAt?: DateTimeFilter<"RewrapKey"> | Date | string
    expiresAt?: DateTimeNullableFilter<"RewrapKey"> | Date | string | null
    accessCount?: IntFilter<"RewrapKey"> | number
    lastAccessedAt?: DateTimeNullableFilter<"RewrapKey"> | Date | string | null
    accessLogs?: AccessLogListRelationFilter
  }, "id" | "recordCid_recipientPubkey">

  export type RewrapKeyOrderByWithAggregationInput = {
    id?: SortOrder
    recordCid?: SortOrder
    recipientPubkey?: SortOrder
    encryptedSymKey?: SortOrder
    creatorPubkey?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    accessCount?: SortOrder
    lastAccessedAt?: SortOrderInput | SortOrder
    _count?: RewrapKeyCountOrderByAggregateInput
    _avg?: RewrapKeyAvgOrderByAggregateInput
    _max?: RewrapKeyMaxOrderByAggregateInput
    _min?: RewrapKeyMinOrderByAggregateInput
    _sum?: RewrapKeySumOrderByAggregateInput
  }

  export type RewrapKeyScalarWhereWithAggregatesInput = {
    AND?: RewrapKeyScalarWhereWithAggregatesInput | RewrapKeyScalarWhereWithAggregatesInput[]
    OR?: RewrapKeyScalarWhereWithAggregatesInput[]
    NOT?: RewrapKeyScalarWhereWithAggregatesInput | RewrapKeyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RewrapKey"> | number
    recordCid?: StringWithAggregatesFilter<"RewrapKey"> | string
    recipientPubkey?: StringWithAggregatesFilter<"RewrapKey"> | string
    encryptedSymKey?: StringWithAggregatesFilter<"RewrapKey"> | string
    creatorPubkey?: StringNullableWithAggregatesFilter<"RewrapKey"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RewrapKey"> | Date | string
    expiresAt?: DateTimeNullableWithAggregatesFilter<"RewrapKey"> | Date | string | null
    accessCount?: IntWithAggregatesFilter<"RewrapKey"> | number
    lastAccessedAt?: DateTimeNullableWithAggregatesFilter<"RewrapKey"> | Date | string | null
  }

  export type AccessLogWhereInput = {
    AND?: AccessLogWhereInput | AccessLogWhereInput[]
    OR?: AccessLogWhereInput[]
    NOT?: AccessLogWhereInput | AccessLogWhereInput[]
    id?: IntFilter<"AccessLog"> | number
    recordCid?: StringFilter<"AccessLog"> | string
    recipientPubkey?: StringFilter<"AccessLog"> | string
    rewrapKeyId?: IntNullableFilter<"AccessLog"> | number | null
    success?: BoolFilter<"AccessLog"> | boolean
    ipAddress?: StringNullableFilter<"AccessLog"> | string | null
    userAgent?: StringNullableFilter<"AccessLog"> | string | null
    errorMessage?: StringNullableFilter<"AccessLog"> | string | null
    accessedAt?: DateTimeFilter<"AccessLog"> | Date | string
    rewrapKey?: XOR<RewrapKeyNullableScalarRelationFilter, RewrapKeyWhereInput> | null
  }

  export type AccessLogOrderByWithRelationInput = {
    id?: SortOrder
    recordCid?: SortOrder
    recipientPubkey?: SortOrder
    rewrapKeyId?: SortOrderInput | SortOrder
    success?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    accessedAt?: SortOrder
    rewrapKey?: RewrapKeyOrderByWithRelationInput
  }

  export type AccessLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AccessLogWhereInput | AccessLogWhereInput[]
    OR?: AccessLogWhereInput[]
    NOT?: AccessLogWhereInput | AccessLogWhereInput[]
    recordCid?: StringFilter<"AccessLog"> | string
    recipientPubkey?: StringFilter<"AccessLog"> | string
    rewrapKeyId?: IntNullableFilter<"AccessLog"> | number | null
    success?: BoolFilter<"AccessLog"> | boolean
    ipAddress?: StringNullableFilter<"AccessLog"> | string | null
    userAgent?: StringNullableFilter<"AccessLog"> | string | null
    errorMessage?: StringNullableFilter<"AccessLog"> | string | null
    accessedAt?: DateTimeFilter<"AccessLog"> | Date | string
    rewrapKey?: XOR<RewrapKeyNullableScalarRelationFilter, RewrapKeyWhereInput> | null
  }, "id">

  export type AccessLogOrderByWithAggregationInput = {
    id?: SortOrder
    recordCid?: SortOrder
    recipientPubkey?: SortOrder
    rewrapKeyId?: SortOrderInput | SortOrder
    success?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    accessedAt?: SortOrder
    _count?: AccessLogCountOrderByAggregateInput
    _avg?: AccessLogAvgOrderByAggregateInput
    _max?: AccessLogMaxOrderByAggregateInput
    _min?: AccessLogMinOrderByAggregateInput
    _sum?: AccessLogSumOrderByAggregateInput
  }

  export type AccessLogScalarWhereWithAggregatesInput = {
    AND?: AccessLogScalarWhereWithAggregatesInput | AccessLogScalarWhereWithAggregatesInput[]
    OR?: AccessLogScalarWhereWithAggregatesInput[]
    NOT?: AccessLogScalarWhereWithAggregatesInput | AccessLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AccessLog"> | number
    recordCid?: StringWithAggregatesFilter<"AccessLog"> | string
    recipientPubkey?: StringWithAggregatesFilter<"AccessLog"> | string
    rewrapKeyId?: IntNullableWithAggregatesFilter<"AccessLog"> | number | null
    success?: BoolWithAggregatesFilter<"AccessLog"> | boolean
    ipAddress?: StringNullableWithAggregatesFilter<"AccessLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AccessLog"> | string | null
    errorMessage?: StringNullableWithAggregatesFilter<"AccessLog"> | string | null
    accessedAt?: DateTimeWithAggregatesFilter<"AccessLog"> | Date | string
  }

  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    id?: IntFilter<"Admin"> | number
    pubkey?: StringFilter<"Admin"> | string
    addedBy?: StringNullableFilter<"Admin"> | string | null
    addedAt?: DateTimeFilter<"Admin"> | Date | string
    isActive?: BoolFilter<"Admin"> | boolean
  }

  export type AdminOrderByWithRelationInput = {
    id?: SortOrder
    pubkey?: SortOrder
    addedBy?: SortOrderInput | SortOrder
    addedAt?: SortOrder
    isActive?: SortOrder
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    pubkey?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    addedBy?: StringNullableFilter<"Admin"> | string | null
    addedAt?: DateTimeFilter<"Admin"> | Date | string
    isActive?: BoolFilter<"Admin"> | boolean
  }, "id" | "pubkey">

  export type AdminOrderByWithAggregationInput = {
    id?: SortOrder
    pubkey?: SortOrder
    addedBy?: SortOrderInput | SortOrder
    addedAt?: SortOrder
    isActive?: SortOrder
    _count?: AdminCountOrderByAggregateInput
    _avg?: AdminAvgOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
    _sum?: AdminSumOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Admin"> | number
    pubkey?: StringWithAggregatesFilter<"Admin"> | string
    addedBy?: StringNullableWithAggregatesFilter<"Admin"> | string | null
    addedAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
    isActive?: BoolWithAggregatesFilter<"Admin"> | boolean
  }

  export type ConsentCredentialWhereInput = {
    AND?: ConsentCredentialWhereInput | ConsentCredentialWhereInput[]
    OR?: ConsentCredentialWhereInput[]
    NOT?: ConsentCredentialWhereInput | ConsentCredentialWhereInput[]
    id?: IntFilter<"ConsentCredential"> | number
    consentCid?: StringFilter<"ConsentCredential"> | string
    recordCid?: StringFilter<"ConsentCredential"> | string
    issuerPubkey?: StringFilter<"ConsentCredential"> | string
    recipientPubkey?: StringFilter<"ConsentCredential"> | string
    expiresAt?: DateTimeNullableFilter<"ConsentCredential"> | Date | string | null
    createdAt?: DateTimeFilter<"ConsentCredential"> | Date | string
    revokedAt?: DateTimeNullableFilter<"ConsentCredential"> | Date | string | null
    revokedReason?: StringNullableFilter<"ConsentCredential"> | string | null
    anchoredTxId?: StringNullableFilter<"ConsentCredential"> | string | null
  }

  export type ConsentCredentialOrderByWithRelationInput = {
    id?: SortOrder
    consentCid?: SortOrder
    recordCid?: SortOrder
    issuerPubkey?: SortOrder
    recipientPubkey?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    revokedReason?: SortOrderInput | SortOrder
    anchoredTxId?: SortOrderInput | SortOrder
  }

  export type ConsentCredentialWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    consentCid?: string
    AND?: ConsentCredentialWhereInput | ConsentCredentialWhereInput[]
    OR?: ConsentCredentialWhereInput[]
    NOT?: ConsentCredentialWhereInput | ConsentCredentialWhereInput[]
    recordCid?: StringFilter<"ConsentCredential"> | string
    issuerPubkey?: StringFilter<"ConsentCredential"> | string
    recipientPubkey?: StringFilter<"ConsentCredential"> | string
    expiresAt?: DateTimeNullableFilter<"ConsentCredential"> | Date | string | null
    createdAt?: DateTimeFilter<"ConsentCredential"> | Date | string
    revokedAt?: DateTimeNullableFilter<"ConsentCredential"> | Date | string | null
    revokedReason?: StringNullableFilter<"ConsentCredential"> | string | null
    anchoredTxId?: StringNullableFilter<"ConsentCredential"> | string | null
  }, "id" | "consentCid">

  export type ConsentCredentialOrderByWithAggregationInput = {
    id?: SortOrder
    consentCid?: SortOrder
    recordCid?: SortOrder
    issuerPubkey?: SortOrder
    recipientPubkey?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    revokedReason?: SortOrderInput | SortOrder
    anchoredTxId?: SortOrderInput | SortOrder
    _count?: ConsentCredentialCountOrderByAggregateInput
    _avg?: ConsentCredentialAvgOrderByAggregateInput
    _max?: ConsentCredentialMaxOrderByAggregateInput
    _min?: ConsentCredentialMinOrderByAggregateInput
    _sum?: ConsentCredentialSumOrderByAggregateInput
  }

  export type ConsentCredentialScalarWhereWithAggregatesInput = {
    AND?: ConsentCredentialScalarWhereWithAggregatesInput | ConsentCredentialScalarWhereWithAggregatesInput[]
    OR?: ConsentCredentialScalarWhereWithAggregatesInput[]
    NOT?: ConsentCredentialScalarWhereWithAggregatesInput | ConsentCredentialScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ConsentCredential"> | number
    consentCid?: StringWithAggregatesFilter<"ConsentCredential"> | string
    recordCid?: StringWithAggregatesFilter<"ConsentCredential"> | string
    issuerPubkey?: StringWithAggregatesFilter<"ConsentCredential"> | string
    recipientPubkey?: StringWithAggregatesFilter<"ConsentCredential"> | string
    expiresAt?: DateTimeNullableWithAggregatesFilter<"ConsentCredential"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ConsentCredential"> | Date | string
    revokedAt?: DateTimeNullableWithAggregatesFilter<"ConsentCredential"> | Date | string | null
    revokedReason?: StringNullableWithAggregatesFilter<"ConsentCredential"> | string | null
    anchoredTxId?: StringNullableWithAggregatesFilter<"ConsentCredential"> | string | null
  }

  export type RecordAnchorWhereInput = {
    AND?: RecordAnchorWhereInput | RecordAnchorWhereInput[]
    OR?: RecordAnchorWhereInput[]
    NOT?: RecordAnchorWhereInput | RecordAnchorWhereInput[]
    id?: IntFilter<"RecordAnchor"> | number
    recordCid?: StringFilter<"RecordAnchor"> | string
    txSignature?: StringFilter<"RecordAnchor"> | string
    pda?: StringFilter<"RecordAnchor"> | string
    anchoredBy?: StringFilter<"RecordAnchor"> | string
    anchoredAt?: DateTimeFilter<"RecordAnchor"> | Date | string
  }

  export type RecordAnchorOrderByWithRelationInput = {
    id?: SortOrder
    recordCid?: SortOrder
    txSignature?: SortOrder
    pda?: SortOrder
    anchoredBy?: SortOrder
    anchoredAt?: SortOrder
  }

  export type RecordAnchorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    recordCid?: string
    AND?: RecordAnchorWhereInput | RecordAnchorWhereInput[]
    OR?: RecordAnchorWhereInput[]
    NOT?: RecordAnchorWhereInput | RecordAnchorWhereInput[]
    txSignature?: StringFilter<"RecordAnchor"> | string
    pda?: StringFilter<"RecordAnchor"> | string
    anchoredBy?: StringFilter<"RecordAnchor"> | string
    anchoredAt?: DateTimeFilter<"RecordAnchor"> | Date | string
  }, "id" | "recordCid">

  export type RecordAnchorOrderByWithAggregationInput = {
    id?: SortOrder
    recordCid?: SortOrder
    txSignature?: SortOrder
    pda?: SortOrder
    anchoredBy?: SortOrder
    anchoredAt?: SortOrder
    _count?: RecordAnchorCountOrderByAggregateInput
    _avg?: RecordAnchorAvgOrderByAggregateInput
    _max?: RecordAnchorMaxOrderByAggregateInput
    _min?: RecordAnchorMinOrderByAggregateInput
    _sum?: RecordAnchorSumOrderByAggregateInput
  }

  export type RecordAnchorScalarWhereWithAggregatesInput = {
    AND?: RecordAnchorScalarWhereWithAggregatesInput | RecordAnchorScalarWhereWithAggregatesInput[]
    OR?: RecordAnchorScalarWhereWithAggregatesInput[]
    NOT?: RecordAnchorScalarWhereWithAggregatesInput | RecordAnchorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RecordAnchor"> | number
    recordCid?: StringWithAggregatesFilter<"RecordAnchor"> | string
    txSignature?: StringWithAggregatesFilter<"RecordAnchor"> | string
    pda?: StringWithAggregatesFilter<"RecordAnchor"> | string
    anchoredBy?: StringWithAggregatesFilter<"RecordAnchor"> | string
    anchoredAt?: DateTimeWithAggregatesFilter<"RecordAnchor"> | Date | string
  }

  export type AccessRequestWhereInput = {
    AND?: AccessRequestWhereInput | AccessRequestWhereInput[]
    OR?: AccessRequestWhereInput[]
    NOT?: AccessRequestWhereInput | AccessRequestWhereInput[]
    id?: IntFilter<"AccessRequest"> | number
    recordCid?: StringFilter<"AccessRequest"> | string
    requesterPubkey?: StringFilter<"AccessRequest"> | string
    ownerPubkey?: StringFilter<"AccessRequest"> | string
    purpose?: StringFilter<"AccessRequest"> | string
    status?: StringFilter<"AccessRequest"> | string
    respondedAt?: DateTimeNullableFilter<"AccessRequest"> | Date | string | null
    responseNote?: StringNullableFilter<"AccessRequest"> | string | null
    consentId?: IntNullableFilter<"AccessRequest"> | number | null
    createdAt?: DateTimeFilter<"AccessRequest"> | Date | string
  }

  export type AccessRequestOrderByWithRelationInput = {
    id?: SortOrder
    recordCid?: SortOrder
    requesterPubkey?: SortOrder
    ownerPubkey?: SortOrder
    purpose?: SortOrder
    status?: SortOrder
    respondedAt?: SortOrderInput | SortOrder
    responseNote?: SortOrderInput | SortOrder
    consentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AccessRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AccessRequestWhereInput | AccessRequestWhereInput[]
    OR?: AccessRequestWhereInput[]
    NOT?: AccessRequestWhereInput | AccessRequestWhereInput[]
    recordCid?: StringFilter<"AccessRequest"> | string
    requesterPubkey?: StringFilter<"AccessRequest"> | string
    ownerPubkey?: StringFilter<"AccessRequest"> | string
    purpose?: StringFilter<"AccessRequest"> | string
    status?: StringFilter<"AccessRequest"> | string
    respondedAt?: DateTimeNullableFilter<"AccessRequest"> | Date | string | null
    responseNote?: StringNullableFilter<"AccessRequest"> | string | null
    consentId?: IntNullableFilter<"AccessRequest"> | number | null
    createdAt?: DateTimeFilter<"AccessRequest"> | Date | string
  }, "id">

  export type AccessRequestOrderByWithAggregationInput = {
    id?: SortOrder
    recordCid?: SortOrder
    requesterPubkey?: SortOrder
    ownerPubkey?: SortOrder
    purpose?: SortOrder
    status?: SortOrder
    respondedAt?: SortOrderInput | SortOrder
    responseNote?: SortOrderInput | SortOrder
    consentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AccessRequestCountOrderByAggregateInput
    _avg?: AccessRequestAvgOrderByAggregateInput
    _max?: AccessRequestMaxOrderByAggregateInput
    _min?: AccessRequestMinOrderByAggregateInput
    _sum?: AccessRequestSumOrderByAggregateInput
  }

  export type AccessRequestScalarWhereWithAggregatesInput = {
    AND?: AccessRequestScalarWhereWithAggregatesInput | AccessRequestScalarWhereWithAggregatesInput[]
    OR?: AccessRequestScalarWhereWithAggregatesInput[]
    NOT?: AccessRequestScalarWhereWithAggregatesInput | AccessRequestScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AccessRequest"> | number
    recordCid?: StringWithAggregatesFilter<"AccessRequest"> | string
    requesterPubkey?: StringWithAggregatesFilter<"AccessRequest"> | string
    ownerPubkey?: StringWithAggregatesFilter<"AccessRequest"> | string
    purpose?: StringWithAggregatesFilter<"AccessRequest"> | string
    status?: StringWithAggregatesFilter<"AccessRequest"> | string
    respondedAt?: DateTimeNullableWithAggregatesFilter<"AccessRequest"> | Date | string | null
    responseNote?: StringNullableWithAggregatesFilter<"AccessRequest"> | string | null
    consentId?: IntNullableWithAggregatesFilter<"AccessRequest"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"AccessRequest"> | Date | string
  }

  export type AuditEventWhereInput = {
    AND?: AuditEventWhereInput | AuditEventWhereInput[]
    OR?: AuditEventWhereInput[]
    NOT?: AuditEventWhereInput | AuditEventWhereInput[]
    id?: IntFilter<"AuditEvent"> | number
    action?: StringFilter<"AuditEvent"> | string
    actorPubkey?: StringFilter<"AuditEvent"> | string
    recordCid?: StringNullableFilter<"AuditEvent"> | string | null
    targetPubkey?: StringNullableFilter<"AuditEvent"> | string | null
    metadata?: StringNullableFilter<"AuditEvent"> | string | null
    ipAddress?: StringNullableFilter<"AuditEvent"> | string | null
    txSignature?: StringNullableFilter<"AuditEvent"> | string | null
    createdAt?: DateTimeFilter<"AuditEvent"> | Date | string
  }

  export type AuditEventOrderByWithRelationInput = {
    id?: SortOrder
    action?: SortOrder
    actorPubkey?: SortOrder
    recordCid?: SortOrderInput | SortOrder
    targetPubkey?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    txSignature?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AuditEventWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AuditEventWhereInput | AuditEventWhereInput[]
    OR?: AuditEventWhereInput[]
    NOT?: AuditEventWhereInput | AuditEventWhereInput[]
    action?: StringFilter<"AuditEvent"> | string
    actorPubkey?: StringFilter<"AuditEvent"> | string
    recordCid?: StringNullableFilter<"AuditEvent"> | string | null
    targetPubkey?: StringNullableFilter<"AuditEvent"> | string | null
    metadata?: StringNullableFilter<"AuditEvent"> | string | null
    ipAddress?: StringNullableFilter<"AuditEvent"> | string | null
    txSignature?: StringNullableFilter<"AuditEvent"> | string | null
    createdAt?: DateTimeFilter<"AuditEvent"> | Date | string
  }, "id">

  export type AuditEventOrderByWithAggregationInput = {
    id?: SortOrder
    action?: SortOrder
    actorPubkey?: SortOrder
    recordCid?: SortOrderInput | SortOrder
    targetPubkey?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    txSignature?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditEventCountOrderByAggregateInput
    _avg?: AuditEventAvgOrderByAggregateInput
    _max?: AuditEventMaxOrderByAggregateInput
    _min?: AuditEventMinOrderByAggregateInput
    _sum?: AuditEventSumOrderByAggregateInput
  }

  export type AuditEventScalarWhereWithAggregatesInput = {
    AND?: AuditEventScalarWhereWithAggregatesInput | AuditEventScalarWhereWithAggregatesInput[]
    OR?: AuditEventScalarWhereWithAggregatesInput[]
    NOT?: AuditEventScalarWhereWithAggregatesInput | AuditEventScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AuditEvent"> | number
    action?: StringWithAggregatesFilter<"AuditEvent"> | string
    actorPubkey?: StringWithAggregatesFilter<"AuditEvent"> | string
    recordCid?: StringNullableWithAggregatesFilter<"AuditEvent"> | string | null
    targetPubkey?: StringNullableWithAggregatesFilter<"AuditEvent"> | string | null
    metadata?: StringNullableWithAggregatesFilter<"AuditEvent"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"AuditEvent"> | string | null
    txSignature?: StringNullableWithAggregatesFilter<"AuditEvent"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditEvent"> | Date | string
  }

  export type MerkleLeafWhereInput = {
    AND?: MerkleLeafWhereInput | MerkleLeafWhereInput[]
    OR?: MerkleLeafWhereInput[]
    NOT?: MerkleLeafWhereInput | MerkleLeafWhereInput[]
    id?: IntFilter<"MerkleLeaf"> | number
    ownerPubkey?: StringFilter<"MerkleLeaf"> | string
    recordCid?: StringFilter<"MerkleLeaf"> | string
    leafHash?: StringFilter<"MerkleLeaf"> | string
    leafIndex?: IntNullableFilter<"MerkleLeaf"> | number | null
    createdAt?: DateTimeFilter<"MerkleLeaf"> | Date | string
  }

  export type MerkleLeafOrderByWithRelationInput = {
    id?: SortOrder
    ownerPubkey?: SortOrder
    recordCid?: SortOrder
    leafHash?: SortOrder
    leafIndex?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type MerkleLeafWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MerkleLeafWhereInput | MerkleLeafWhereInput[]
    OR?: MerkleLeafWhereInput[]
    NOT?: MerkleLeafWhereInput | MerkleLeafWhereInput[]
    ownerPubkey?: StringFilter<"MerkleLeaf"> | string
    recordCid?: StringFilter<"MerkleLeaf"> | string
    leafHash?: StringFilter<"MerkleLeaf"> | string
    leafIndex?: IntNullableFilter<"MerkleLeaf"> | number | null
    createdAt?: DateTimeFilter<"MerkleLeaf"> | Date | string
  }, "id">

  export type MerkleLeafOrderByWithAggregationInput = {
    id?: SortOrder
    ownerPubkey?: SortOrder
    recordCid?: SortOrder
    leafHash?: SortOrder
    leafIndex?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: MerkleLeafCountOrderByAggregateInput
    _avg?: MerkleLeafAvgOrderByAggregateInput
    _max?: MerkleLeafMaxOrderByAggregateInput
    _min?: MerkleLeafMinOrderByAggregateInput
    _sum?: MerkleLeafSumOrderByAggregateInput
  }

  export type MerkleLeafScalarWhereWithAggregatesInput = {
    AND?: MerkleLeafScalarWhereWithAggregatesInput | MerkleLeafScalarWhereWithAggregatesInput[]
    OR?: MerkleLeafScalarWhereWithAggregatesInput[]
    NOT?: MerkleLeafScalarWhereWithAggregatesInput | MerkleLeafScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MerkleLeaf"> | number
    ownerPubkey?: StringWithAggregatesFilter<"MerkleLeaf"> | string
    recordCid?: StringWithAggregatesFilter<"MerkleLeaf"> | string
    leafHash?: StringWithAggregatesFilter<"MerkleLeaf"> | string
    leafIndex?: IntNullableWithAggregatesFilter<"MerkleLeaf"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"MerkleLeaf"> | Date | string
  }

  export type RewrapKeyCreateInput = {
    recordCid: string
    recipientPubkey: string
    encryptedSymKey: string
    creatorPubkey?: string | null
    createdAt?: Date | string
    expiresAt?: Date | string | null
    accessCount?: number
    lastAccessedAt?: Date | string | null
    accessLogs?: AccessLogCreateNestedManyWithoutRewrapKeyInput
  }

  export type RewrapKeyUncheckedCreateInput = {
    id?: number
    recordCid: string
    recipientPubkey: string
    encryptedSymKey: string
    creatorPubkey?: string | null
    createdAt?: Date | string
    expiresAt?: Date | string | null
    accessCount?: number
    lastAccessedAt?: Date | string | null
    accessLogs?: AccessLogUncheckedCreateNestedManyWithoutRewrapKeyInput
  }

  export type RewrapKeyUpdateInput = {
    recordCid?: StringFieldUpdateOperationsInput | string
    recipientPubkey?: StringFieldUpdateOperationsInput | string
    encryptedSymKey?: StringFieldUpdateOperationsInput | string
    creatorPubkey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessCount?: IntFieldUpdateOperationsInput | number
    lastAccessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessLogs?: AccessLogUpdateManyWithoutRewrapKeyNestedInput
  }

  export type RewrapKeyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    recordCid?: StringFieldUpdateOperationsInput | string
    recipientPubkey?: StringFieldUpdateOperationsInput | string
    encryptedSymKey?: StringFieldUpdateOperationsInput | string
    creatorPubkey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessCount?: IntFieldUpdateOperationsInput | number
    lastAccessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessLogs?: AccessLogUncheckedUpdateManyWithoutRewrapKeyNestedInput
  }

  export type RewrapKeyCreateManyInput = {
    id?: number
    recordCid: string
    recipientPubkey: string
    encryptedSymKey: string
    creatorPubkey?: string | null
    createdAt?: Date | string
    expiresAt?: Date | string | null
    accessCount?: number
    lastAccessedAt?: Date | string | null
  }

  export type RewrapKeyUpdateManyMutationInput = {
    recordCid?: StringFieldUpdateOperationsInput | string
    recipientPubkey?: StringFieldUpdateOperationsInput | string
    encryptedSymKey?: StringFieldUpdateOperationsInput | string
    creatorPubkey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessCount?: IntFieldUpdateOperationsInput | number
    lastAccessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RewrapKeyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    recordCid?: StringFieldUpdateOperationsInput | string
    recipientPubkey?: StringFieldUpdateOperationsInput | string
    encryptedSymKey?: StringFieldUpdateOperationsInput | string
    creatorPubkey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessCount?: IntFieldUpdateOperationsInput | number
    lastAccessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AccessLogCreateInput = {
    recordCid: string
    recipientPubkey: string
    success: boolean
    ipAddress?: string | null
    userAgent?: string | null
    errorMessage?: string | null
    accessedAt?: Date | string
    rewrapKey?: RewrapKeyCreateNestedOneWithoutAccessLogsInput
  }

  export type AccessLogUncheckedCreateInput = {
    id?: number
    recordCid: string
    recipientPubkey: string
    rewrapKeyId?: number | null
    success: boolean
    ipAddress?: string | null
    userAgent?: string | null
    errorMessage?: string | null
    accessedAt?: Date | string
  }

  export type AccessLogUpdateInput = {
    recordCid?: StringFieldUpdateOperationsInput | string
    recipientPubkey?: StringFieldUpdateOperationsInput | string
    success?: BoolFieldUpdateOperationsInput | boolean
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    accessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rewrapKey?: RewrapKeyUpdateOneWithoutAccessLogsNestedInput
  }

  export type AccessLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    recordCid?: StringFieldUpdateOperationsInput | string
    recipientPubkey?: StringFieldUpdateOperationsInput | string
    rewrapKeyId?: NullableIntFieldUpdateOperationsInput | number | null
    success?: BoolFieldUpdateOperationsInput | boolean
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    accessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessLogCreateManyInput = {
    id?: number
    recordCid: string
    recipientPubkey: string
    rewrapKeyId?: number | null
    success: boolean
    ipAddress?: string | null
    userAgent?: string | null
    errorMessage?: string | null
    accessedAt?: Date | string
  }

  export type AccessLogUpdateManyMutationInput = {
    recordCid?: StringFieldUpdateOperationsInput | string
    recipientPubkey?: StringFieldUpdateOperationsInput | string
    success?: BoolFieldUpdateOperationsInput | boolean
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    accessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    recordCid?: StringFieldUpdateOperationsInput | string
    recipientPubkey?: StringFieldUpdateOperationsInput | string
    rewrapKeyId?: NullableIntFieldUpdateOperationsInput | number | null
    success?: BoolFieldUpdateOperationsInput | boolean
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    accessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminCreateInput = {
    pubkey: string
    addedBy?: string | null
    addedAt?: Date | string
    isActive?: boolean
  }

  export type AdminUncheckedCreateInput = {
    id?: number
    pubkey: string
    addedBy?: string | null
    addedAt?: Date | string
    isActive?: boolean
  }

  export type AdminUpdateInput = {
    pubkey?: StringFieldUpdateOperationsInput | string
    addedBy?: NullableStringFieldUpdateOperationsInput | string | null
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AdminUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    pubkey?: StringFieldUpdateOperationsInput | string
    addedBy?: NullableStringFieldUpdateOperationsInput | string | null
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AdminCreateManyInput = {
    id?: number
    pubkey: string
    addedBy?: string | null
    addedAt?: Date | string
    isActive?: boolean
  }

  export type AdminUpdateManyMutationInput = {
    pubkey?: StringFieldUpdateOperationsInput | string
    addedBy?: NullableStringFieldUpdateOperationsInput | string | null
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AdminUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    pubkey?: StringFieldUpdateOperationsInput | string
    addedBy?: NullableStringFieldUpdateOperationsInput | string | null
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ConsentCredentialCreateInput = {
    consentCid: string
    recordCid: string
    issuerPubkey: string
    recipientPubkey: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
    revokedReason?: string | null
    anchoredTxId?: string | null
  }

  export type ConsentCredentialUncheckedCreateInput = {
    id?: number
    consentCid: string
    recordCid: string
    issuerPubkey: string
    recipientPubkey: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
    revokedReason?: string | null
    anchoredTxId?: string | null
  }

  export type ConsentCredentialUpdateInput = {
    consentCid?: StringFieldUpdateOperationsInput | string
    recordCid?: StringFieldUpdateOperationsInput | string
    issuerPubkey?: StringFieldUpdateOperationsInput | string
    recipientPubkey?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedReason?: NullableStringFieldUpdateOperationsInput | string | null
    anchoredTxId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConsentCredentialUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    consentCid?: StringFieldUpdateOperationsInput | string
    recordCid?: StringFieldUpdateOperationsInput | string
    issuerPubkey?: StringFieldUpdateOperationsInput | string
    recipientPubkey?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedReason?: NullableStringFieldUpdateOperationsInput | string | null
    anchoredTxId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConsentCredentialCreateManyInput = {
    id?: number
    consentCid: string
    recordCid: string
    issuerPubkey: string
    recipientPubkey: string
    expiresAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
    revokedReason?: string | null
    anchoredTxId?: string | null
  }

  export type ConsentCredentialUpdateManyMutationInput = {
    consentCid?: StringFieldUpdateOperationsInput | string
    recordCid?: StringFieldUpdateOperationsInput | string
    issuerPubkey?: StringFieldUpdateOperationsInput | string
    recipientPubkey?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedReason?: NullableStringFieldUpdateOperationsInput | string | null
    anchoredTxId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConsentCredentialUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    consentCid?: StringFieldUpdateOperationsInput | string
    recordCid?: StringFieldUpdateOperationsInput | string
    issuerPubkey?: StringFieldUpdateOperationsInput | string
    recipientPubkey?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedReason?: NullableStringFieldUpdateOperationsInput | string | null
    anchoredTxId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecordAnchorCreateInput = {
    recordCid: string
    txSignature: string
    pda: string
    anchoredBy: string
    anchoredAt?: Date | string
  }

  export type RecordAnchorUncheckedCreateInput = {
    id?: number
    recordCid: string
    txSignature: string
    pda: string
    anchoredBy: string
    anchoredAt?: Date | string
  }

  export type RecordAnchorUpdateInput = {
    recordCid?: StringFieldUpdateOperationsInput | string
    txSignature?: StringFieldUpdateOperationsInput | string
    pda?: StringFieldUpdateOperationsInput | string
    anchoredBy?: StringFieldUpdateOperationsInput | string
    anchoredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecordAnchorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    recordCid?: StringFieldUpdateOperationsInput | string
    txSignature?: StringFieldUpdateOperationsInput | string
    pda?: StringFieldUpdateOperationsInput | string
    anchoredBy?: StringFieldUpdateOperationsInput | string
    anchoredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecordAnchorCreateManyInput = {
    id?: number
    recordCid: string
    txSignature: string
    pda: string
    anchoredBy: string
    anchoredAt?: Date | string
  }

  export type RecordAnchorUpdateManyMutationInput = {
    recordCid?: StringFieldUpdateOperationsInput | string
    txSignature?: StringFieldUpdateOperationsInput | string
    pda?: StringFieldUpdateOperationsInput | string
    anchoredBy?: StringFieldUpdateOperationsInput | string
    anchoredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecordAnchorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    recordCid?: StringFieldUpdateOperationsInput | string
    txSignature?: StringFieldUpdateOperationsInput | string
    pda?: StringFieldUpdateOperationsInput | string
    anchoredBy?: StringFieldUpdateOperationsInput | string
    anchoredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessRequestCreateInput = {
    recordCid: string
    requesterPubkey: string
    ownerPubkey: string
    purpose: string
    status?: string
    respondedAt?: Date | string | null
    responseNote?: string | null
    consentId?: number | null
    createdAt?: Date | string
  }

  export type AccessRequestUncheckedCreateInput = {
    id?: number
    recordCid: string
    requesterPubkey: string
    ownerPubkey: string
    purpose: string
    status?: string
    respondedAt?: Date | string | null
    responseNote?: string | null
    consentId?: number | null
    createdAt?: Date | string
  }

  export type AccessRequestUpdateInput = {
    recordCid?: StringFieldUpdateOperationsInput | string
    requesterPubkey?: StringFieldUpdateOperationsInput | string
    ownerPubkey?: StringFieldUpdateOperationsInput | string
    purpose?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responseNote?: NullableStringFieldUpdateOperationsInput | string | null
    consentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessRequestUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    recordCid?: StringFieldUpdateOperationsInput | string
    requesterPubkey?: StringFieldUpdateOperationsInput | string
    ownerPubkey?: StringFieldUpdateOperationsInput | string
    purpose?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responseNote?: NullableStringFieldUpdateOperationsInput | string | null
    consentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessRequestCreateManyInput = {
    id?: number
    recordCid: string
    requesterPubkey: string
    ownerPubkey: string
    purpose: string
    status?: string
    respondedAt?: Date | string | null
    responseNote?: string | null
    consentId?: number | null
    createdAt?: Date | string
  }

  export type AccessRequestUpdateManyMutationInput = {
    recordCid?: StringFieldUpdateOperationsInput | string
    requesterPubkey?: StringFieldUpdateOperationsInput | string
    ownerPubkey?: StringFieldUpdateOperationsInput | string
    purpose?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responseNote?: NullableStringFieldUpdateOperationsInput | string | null
    consentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessRequestUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    recordCid?: StringFieldUpdateOperationsInput | string
    requesterPubkey?: StringFieldUpdateOperationsInput | string
    ownerPubkey?: StringFieldUpdateOperationsInput | string
    purpose?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    responseNote?: NullableStringFieldUpdateOperationsInput | string | null
    consentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEventCreateInput = {
    action: string
    actorPubkey: string
    recordCid?: string | null
    targetPubkey?: string | null
    metadata?: string | null
    ipAddress?: string | null
    txSignature?: string | null
    createdAt?: Date | string
  }

  export type AuditEventUncheckedCreateInput = {
    id?: number
    action: string
    actorPubkey: string
    recordCid?: string | null
    targetPubkey?: string | null
    metadata?: string | null
    ipAddress?: string | null
    txSignature?: string | null
    createdAt?: Date | string
  }

  export type AuditEventUpdateInput = {
    action?: StringFieldUpdateOperationsInput | string
    actorPubkey?: StringFieldUpdateOperationsInput | string
    recordCid?: NullableStringFieldUpdateOperationsInput | string | null
    targetPubkey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    txSignature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEventUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    actorPubkey?: StringFieldUpdateOperationsInput | string
    recordCid?: NullableStringFieldUpdateOperationsInput | string | null
    targetPubkey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    txSignature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEventCreateManyInput = {
    id?: number
    action: string
    actorPubkey: string
    recordCid?: string | null
    targetPubkey?: string | null
    metadata?: string | null
    ipAddress?: string | null
    txSignature?: string | null
    createdAt?: Date | string
  }

  export type AuditEventUpdateManyMutationInput = {
    action?: StringFieldUpdateOperationsInput | string
    actorPubkey?: StringFieldUpdateOperationsInput | string
    recordCid?: NullableStringFieldUpdateOperationsInput | string | null
    targetPubkey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    txSignature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEventUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    actorPubkey?: StringFieldUpdateOperationsInput | string
    recordCid?: NullableStringFieldUpdateOperationsInput | string | null
    targetPubkey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    txSignature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MerkleLeafCreateInput = {
    ownerPubkey: string
    recordCid: string
    leafHash: string
    leafIndex?: number | null
    createdAt?: Date | string
  }

  export type MerkleLeafUncheckedCreateInput = {
    id?: number
    ownerPubkey: string
    recordCid: string
    leafHash: string
    leafIndex?: number | null
    createdAt?: Date | string
  }

  export type MerkleLeafUpdateInput = {
    ownerPubkey?: StringFieldUpdateOperationsInput | string
    recordCid?: StringFieldUpdateOperationsInput | string
    leafHash?: StringFieldUpdateOperationsInput | string
    leafIndex?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MerkleLeafUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    ownerPubkey?: StringFieldUpdateOperationsInput | string
    recordCid?: StringFieldUpdateOperationsInput | string
    leafHash?: StringFieldUpdateOperationsInput | string
    leafIndex?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MerkleLeafCreateManyInput = {
    id?: number
    ownerPubkey: string
    recordCid: string
    leafHash: string
    leafIndex?: number | null
    createdAt?: Date | string
  }

  export type MerkleLeafUpdateManyMutationInput = {
    ownerPubkey?: StringFieldUpdateOperationsInput | string
    recordCid?: StringFieldUpdateOperationsInput | string
    leafHash?: StringFieldUpdateOperationsInput | string
    leafIndex?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MerkleLeafUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    ownerPubkey?: StringFieldUpdateOperationsInput | string
    recordCid?: StringFieldUpdateOperationsInput | string
    leafHash?: StringFieldUpdateOperationsInput | string
    leafIndex?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AccessLogListRelationFilter = {
    every?: AccessLogWhereInput
    some?: AccessLogWhereInput
    none?: AccessLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccessLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RewrapKeyRecordCid_recipientPubkeyCompoundUniqueInput = {
    recordCid: string
    recipientPubkey: string
  }

  export type RewrapKeyCountOrderByAggregateInput = {
    id?: SortOrder
    recordCid?: SortOrder
    recipientPubkey?: SortOrder
    encryptedSymKey?: SortOrder
    creatorPubkey?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    accessCount?: SortOrder
    lastAccessedAt?: SortOrder
  }

  export type RewrapKeyAvgOrderByAggregateInput = {
    id?: SortOrder
    accessCount?: SortOrder
  }

  export type RewrapKeyMaxOrderByAggregateInput = {
    id?: SortOrder
    recordCid?: SortOrder
    recipientPubkey?: SortOrder
    encryptedSymKey?: SortOrder
    creatorPubkey?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    accessCount?: SortOrder
    lastAccessedAt?: SortOrder
  }

  export type RewrapKeyMinOrderByAggregateInput = {
    id?: SortOrder
    recordCid?: SortOrder
    recipientPubkey?: SortOrder
    encryptedSymKey?: SortOrder
    creatorPubkey?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    accessCount?: SortOrder
    lastAccessedAt?: SortOrder
  }

  export type RewrapKeySumOrderByAggregateInput = {
    id?: SortOrder
    accessCount?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type RewrapKeyNullableScalarRelationFilter = {
    is?: RewrapKeyWhereInput | null
    isNot?: RewrapKeyWhereInput | null
  }

  export type AccessLogCountOrderByAggregateInput = {
    id?: SortOrder
    recordCid?: SortOrder
    recipientPubkey?: SortOrder
    rewrapKeyId?: SortOrder
    success?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    errorMessage?: SortOrder
    accessedAt?: SortOrder
  }

  export type AccessLogAvgOrderByAggregateInput = {
    id?: SortOrder
    rewrapKeyId?: SortOrder
  }

  export type AccessLogMaxOrderByAggregateInput = {
    id?: SortOrder
    recordCid?: SortOrder
    recipientPubkey?: SortOrder
    rewrapKeyId?: SortOrder
    success?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    errorMessage?: SortOrder
    accessedAt?: SortOrder
  }

  export type AccessLogMinOrderByAggregateInput = {
    id?: SortOrder
    recordCid?: SortOrder
    recipientPubkey?: SortOrder
    rewrapKeyId?: SortOrder
    success?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    errorMessage?: SortOrder
    accessedAt?: SortOrder
  }

  export type AccessLogSumOrderByAggregateInput = {
    id?: SortOrder
    rewrapKeyId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AdminCountOrderByAggregateInput = {
    id?: SortOrder
    pubkey?: SortOrder
    addedBy?: SortOrder
    addedAt?: SortOrder
    isActive?: SortOrder
  }

  export type AdminAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    pubkey?: SortOrder
    addedBy?: SortOrder
    addedAt?: SortOrder
    isActive?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    id?: SortOrder
    pubkey?: SortOrder
    addedBy?: SortOrder
    addedAt?: SortOrder
    isActive?: SortOrder
  }

  export type AdminSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ConsentCredentialCountOrderByAggregateInput = {
    id?: SortOrder
    consentCid?: SortOrder
    recordCid?: SortOrder
    issuerPubkey?: SortOrder
    recipientPubkey?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrder
    revokedReason?: SortOrder
    anchoredTxId?: SortOrder
  }

  export type ConsentCredentialAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ConsentCredentialMaxOrderByAggregateInput = {
    id?: SortOrder
    consentCid?: SortOrder
    recordCid?: SortOrder
    issuerPubkey?: SortOrder
    recipientPubkey?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrder
    revokedReason?: SortOrder
    anchoredTxId?: SortOrder
  }

  export type ConsentCredentialMinOrderByAggregateInput = {
    id?: SortOrder
    consentCid?: SortOrder
    recordCid?: SortOrder
    issuerPubkey?: SortOrder
    recipientPubkey?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrder
    revokedReason?: SortOrder
    anchoredTxId?: SortOrder
  }

  export type ConsentCredentialSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RecordAnchorCountOrderByAggregateInput = {
    id?: SortOrder
    recordCid?: SortOrder
    txSignature?: SortOrder
    pda?: SortOrder
    anchoredBy?: SortOrder
    anchoredAt?: SortOrder
  }

  export type RecordAnchorAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RecordAnchorMaxOrderByAggregateInput = {
    id?: SortOrder
    recordCid?: SortOrder
    txSignature?: SortOrder
    pda?: SortOrder
    anchoredBy?: SortOrder
    anchoredAt?: SortOrder
  }

  export type RecordAnchorMinOrderByAggregateInput = {
    id?: SortOrder
    recordCid?: SortOrder
    txSignature?: SortOrder
    pda?: SortOrder
    anchoredBy?: SortOrder
    anchoredAt?: SortOrder
  }

  export type RecordAnchorSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AccessRequestCountOrderByAggregateInput = {
    id?: SortOrder
    recordCid?: SortOrder
    requesterPubkey?: SortOrder
    ownerPubkey?: SortOrder
    purpose?: SortOrder
    status?: SortOrder
    respondedAt?: SortOrder
    responseNote?: SortOrder
    consentId?: SortOrder
    createdAt?: SortOrder
  }

  export type AccessRequestAvgOrderByAggregateInput = {
    id?: SortOrder
    consentId?: SortOrder
  }

  export type AccessRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    recordCid?: SortOrder
    requesterPubkey?: SortOrder
    ownerPubkey?: SortOrder
    purpose?: SortOrder
    status?: SortOrder
    respondedAt?: SortOrder
    responseNote?: SortOrder
    consentId?: SortOrder
    createdAt?: SortOrder
  }

  export type AccessRequestMinOrderByAggregateInput = {
    id?: SortOrder
    recordCid?: SortOrder
    requesterPubkey?: SortOrder
    ownerPubkey?: SortOrder
    purpose?: SortOrder
    status?: SortOrder
    respondedAt?: SortOrder
    responseNote?: SortOrder
    consentId?: SortOrder
    createdAt?: SortOrder
  }

  export type AccessRequestSumOrderByAggregateInput = {
    id?: SortOrder
    consentId?: SortOrder
  }

  export type AuditEventCountOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    actorPubkey?: SortOrder
    recordCid?: SortOrder
    targetPubkey?: SortOrder
    metadata?: SortOrder
    ipAddress?: SortOrder
    txSignature?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditEventAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AuditEventMaxOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    actorPubkey?: SortOrder
    recordCid?: SortOrder
    targetPubkey?: SortOrder
    metadata?: SortOrder
    ipAddress?: SortOrder
    txSignature?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditEventMinOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    actorPubkey?: SortOrder
    recordCid?: SortOrder
    targetPubkey?: SortOrder
    metadata?: SortOrder
    ipAddress?: SortOrder
    txSignature?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditEventSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MerkleLeafCountOrderByAggregateInput = {
    id?: SortOrder
    ownerPubkey?: SortOrder
    recordCid?: SortOrder
    leafHash?: SortOrder
    leafIndex?: SortOrder
    createdAt?: SortOrder
  }

  export type MerkleLeafAvgOrderByAggregateInput = {
    id?: SortOrder
    leafIndex?: SortOrder
  }

  export type MerkleLeafMaxOrderByAggregateInput = {
    id?: SortOrder
    ownerPubkey?: SortOrder
    recordCid?: SortOrder
    leafHash?: SortOrder
    leafIndex?: SortOrder
    createdAt?: SortOrder
  }

  export type MerkleLeafMinOrderByAggregateInput = {
    id?: SortOrder
    ownerPubkey?: SortOrder
    recordCid?: SortOrder
    leafHash?: SortOrder
    leafIndex?: SortOrder
    createdAt?: SortOrder
  }

  export type MerkleLeafSumOrderByAggregateInput = {
    id?: SortOrder
    leafIndex?: SortOrder
  }

  export type AccessLogCreateNestedManyWithoutRewrapKeyInput = {
    create?: XOR<AccessLogCreateWithoutRewrapKeyInput, AccessLogUncheckedCreateWithoutRewrapKeyInput> | AccessLogCreateWithoutRewrapKeyInput[] | AccessLogUncheckedCreateWithoutRewrapKeyInput[]
    connectOrCreate?: AccessLogCreateOrConnectWithoutRewrapKeyInput | AccessLogCreateOrConnectWithoutRewrapKeyInput[]
    createMany?: AccessLogCreateManyRewrapKeyInputEnvelope
    connect?: AccessLogWhereUniqueInput | AccessLogWhereUniqueInput[]
  }

  export type AccessLogUncheckedCreateNestedManyWithoutRewrapKeyInput = {
    create?: XOR<AccessLogCreateWithoutRewrapKeyInput, AccessLogUncheckedCreateWithoutRewrapKeyInput> | AccessLogCreateWithoutRewrapKeyInput[] | AccessLogUncheckedCreateWithoutRewrapKeyInput[]
    connectOrCreate?: AccessLogCreateOrConnectWithoutRewrapKeyInput | AccessLogCreateOrConnectWithoutRewrapKeyInput[]
    createMany?: AccessLogCreateManyRewrapKeyInputEnvelope
    connect?: AccessLogWhereUniqueInput | AccessLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AccessLogUpdateManyWithoutRewrapKeyNestedInput = {
    create?: XOR<AccessLogCreateWithoutRewrapKeyInput, AccessLogUncheckedCreateWithoutRewrapKeyInput> | AccessLogCreateWithoutRewrapKeyInput[] | AccessLogUncheckedCreateWithoutRewrapKeyInput[]
    connectOrCreate?: AccessLogCreateOrConnectWithoutRewrapKeyInput | AccessLogCreateOrConnectWithoutRewrapKeyInput[]
    upsert?: AccessLogUpsertWithWhereUniqueWithoutRewrapKeyInput | AccessLogUpsertWithWhereUniqueWithoutRewrapKeyInput[]
    createMany?: AccessLogCreateManyRewrapKeyInputEnvelope
    set?: AccessLogWhereUniqueInput | AccessLogWhereUniqueInput[]
    disconnect?: AccessLogWhereUniqueInput | AccessLogWhereUniqueInput[]
    delete?: AccessLogWhereUniqueInput | AccessLogWhereUniqueInput[]
    connect?: AccessLogWhereUniqueInput | AccessLogWhereUniqueInput[]
    update?: AccessLogUpdateWithWhereUniqueWithoutRewrapKeyInput | AccessLogUpdateWithWhereUniqueWithoutRewrapKeyInput[]
    updateMany?: AccessLogUpdateManyWithWhereWithoutRewrapKeyInput | AccessLogUpdateManyWithWhereWithoutRewrapKeyInput[]
    deleteMany?: AccessLogScalarWhereInput | AccessLogScalarWhereInput[]
  }

  export type AccessLogUncheckedUpdateManyWithoutRewrapKeyNestedInput = {
    create?: XOR<AccessLogCreateWithoutRewrapKeyInput, AccessLogUncheckedCreateWithoutRewrapKeyInput> | AccessLogCreateWithoutRewrapKeyInput[] | AccessLogUncheckedCreateWithoutRewrapKeyInput[]
    connectOrCreate?: AccessLogCreateOrConnectWithoutRewrapKeyInput | AccessLogCreateOrConnectWithoutRewrapKeyInput[]
    upsert?: AccessLogUpsertWithWhereUniqueWithoutRewrapKeyInput | AccessLogUpsertWithWhereUniqueWithoutRewrapKeyInput[]
    createMany?: AccessLogCreateManyRewrapKeyInputEnvelope
    set?: AccessLogWhereUniqueInput | AccessLogWhereUniqueInput[]
    disconnect?: AccessLogWhereUniqueInput | AccessLogWhereUniqueInput[]
    delete?: AccessLogWhereUniqueInput | AccessLogWhereUniqueInput[]
    connect?: AccessLogWhereUniqueInput | AccessLogWhereUniqueInput[]
    update?: AccessLogUpdateWithWhereUniqueWithoutRewrapKeyInput | AccessLogUpdateWithWhereUniqueWithoutRewrapKeyInput[]
    updateMany?: AccessLogUpdateManyWithWhereWithoutRewrapKeyInput | AccessLogUpdateManyWithWhereWithoutRewrapKeyInput[]
    deleteMany?: AccessLogScalarWhereInput | AccessLogScalarWhereInput[]
  }

  export type RewrapKeyCreateNestedOneWithoutAccessLogsInput = {
    create?: XOR<RewrapKeyCreateWithoutAccessLogsInput, RewrapKeyUncheckedCreateWithoutAccessLogsInput>
    connectOrCreate?: RewrapKeyCreateOrConnectWithoutAccessLogsInput
    connect?: RewrapKeyWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type RewrapKeyUpdateOneWithoutAccessLogsNestedInput = {
    create?: XOR<RewrapKeyCreateWithoutAccessLogsInput, RewrapKeyUncheckedCreateWithoutAccessLogsInput>
    connectOrCreate?: RewrapKeyCreateOrConnectWithoutAccessLogsInput
    upsert?: RewrapKeyUpsertWithoutAccessLogsInput
    disconnect?: RewrapKeyWhereInput | boolean
    delete?: RewrapKeyWhereInput | boolean
    connect?: RewrapKeyWhereUniqueInput
    update?: XOR<XOR<RewrapKeyUpdateToOneWithWhereWithoutAccessLogsInput, RewrapKeyUpdateWithoutAccessLogsInput>, RewrapKeyUncheckedUpdateWithoutAccessLogsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AccessLogCreateWithoutRewrapKeyInput = {
    recordCid: string
    recipientPubkey: string
    success: boolean
    ipAddress?: string | null
    userAgent?: string | null
    errorMessage?: string | null
    accessedAt?: Date | string
  }

  export type AccessLogUncheckedCreateWithoutRewrapKeyInput = {
    id?: number
    recordCid: string
    recipientPubkey: string
    success: boolean
    ipAddress?: string | null
    userAgent?: string | null
    errorMessage?: string | null
    accessedAt?: Date | string
  }

  export type AccessLogCreateOrConnectWithoutRewrapKeyInput = {
    where: AccessLogWhereUniqueInput
    create: XOR<AccessLogCreateWithoutRewrapKeyInput, AccessLogUncheckedCreateWithoutRewrapKeyInput>
  }

  export type AccessLogCreateManyRewrapKeyInputEnvelope = {
    data: AccessLogCreateManyRewrapKeyInput | AccessLogCreateManyRewrapKeyInput[]
    skipDuplicates?: boolean
  }

  export type AccessLogUpsertWithWhereUniqueWithoutRewrapKeyInput = {
    where: AccessLogWhereUniqueInput
    update: XOR<AccessLogUpdateWithoutRewrapKeyInput, AccessLogUncheckedUpdateWithoutRewrapKeyInput>
    create: XOR<AccessLogCreateWithoutRewrapKeyInput, AccessLogUncheckedCreateWithoutRewrapKeyInput>
  }

  export type AccessLogUpdateWithWhereUniqueWithoutRewrapKeyInput = {
    where: AccessLogWhereUniqueInput
    data: XOR<AccessLogUpdateWithoutRewrapKeyInput, AccessLogUncheckedUpdateWithoutRewrapKeyInput>
  }

  export type AccessLogUpdateManyWithWhereWithoutRewrapKeyInput = {
    where: AccessLogScalarWhereInput
    data: XOR<AccessLogUpdateManyMutationInput, AccessLogUncheckedUpdateManyWithoutRewrapKeyInput>
  }

  export type AccessLogScalarWhereInput = {
    AND?: AccessLogScalarWhereInput | AccessLogScalarWhereInput[]
    OR?: AccessLogScalarWhereInput[]
    NOT?: AccessLogScalarWhereInput | AccessLogScalarWhereInput[]
    id?: IntFilter<"AccessLog"> | number
    recordCid?: StringFilter<"AccessLog"> | string
    recipientPubkey?: StringFilter<"AccessLog"> | string
    rewrapKeyId?: IntNullableFilter<"AccessLog"> | number | null
    success?: BoolFilter<"AccessLog"> | boolean
    ipAddress?: StringNullableFilter<"AccessLog"> | string | null
    userAgent?: StringNullableFilter<"AccessLog"> | string | null
    errorMessage?: StringNullableFilter<"AccessLog"> | string | null
    accessedAt?: DateTimeFilter<"AccessLog"> | Date | string
  }

  export type RewrapKeyCreateWithoutAccessLogsInput = {
    recordCid: string
    recipientPubkey: string
    encryptedSymKey: string
    creatorPubkey?: string | null
    createdAt?: Date | string
    expiresAt?: Date | string | null
    accessCount?: number
    lastAccessedAt?: Date | string | null
  }

  export type RewrapKeyUncheckedCreateWithoutAccessLogsInput = {
    id?: number
    recordCid: string
    recipientPubkey: string
    encryptedSymKey: string
    creatorPubkey?: string | null
    createdAt?: Date | string
    expiresAt?: Date | string | null
    accessCount?: number
    lastAccessedAt?: Date | string | null
  }

  export type RewrapKeyCreateOrConnectWithoutAccessLogsInput = {
    where: RewrapKeyWhereUniqueInput
    create: XOR<RewrapKeyCreateWithoutAccessLogsInput, RewrapKeyUncheckedCreateWithoutAccessLogsInput>
  }

  export type RewrapKeyUpsertWithoutAccessLogsInput = {
    update: XOR<RewrapKeyUpdateWithoutAccessLogsInput, RewrapKeyUncheckedUpdateWithoutAccessLogsInput>
    create: XOR<RewrapKeyCreateWithoutAccessLogsInput, RewrapKeyUncheckedCreateWithoutAccessLogsInput>
    where?: RewrapKeyWhereInput
  }

  export type RewrapKeyUpdateToOneWithWhereWithoutAccessLogsInput = {
    where?: RewrapKeyWhereInput
    data: XOR<RewrapKeyUpdateWithoutAccessLogsInput, RewrapKeyUncheckedUpdateWithoutAccessLogsInput>
  }

  export type RewrapKeyUpdateWithoutAccessLogsInput = {
    recordCid?: StringFieldUpdateOperationsInput | string
    recipientPubkey?: StringFieldUpdateOperationsInput | string
    encryptedSymKey?: StringFieldUpdateOperationsInput | string
    creatorPubkey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessCount?: IntFieldUpdateOperationsInput | number
    lastAccessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RewrapKeyUncheckedUpdateWithoutAccessLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    recordCid?: StringFieldUpdateOperationsInput | string
    recipientPubkey?: StringFieldUpdateOperationsInput | string
    encryptedSymKey?: StringFieldUpdateOperationsInput | string
    creatorPubkey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accessCount?: IntFieldUpdateOperationsInput | number
    lastAccessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AccessLogCreateManyRewrapKeyInput = {
    id?: number
    recordCid: string
    recipientPubkey: string
    success: boolean
    ipAddress?: string | null
    userAgent?: string | null
    errorMessage?: string | null
    accessedAt?: Date | string
  }

  export type AccessLogUpdateWithoutRewrapKeyInput = {
    recordCid?: StringFieldUpdateOperationsInput | string
    recipientPubkey?: StringFieldUpdateOperationsInput | string
    success?: BoolFieldUpdateOperationsInput | boolean
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    accessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessLogUncheckedUpdateWithoutRewrapKeyInput = {
    id?: IntFieldUpdateOperationsInput | number
    recordCid?: StringFieldUpdateOperationsInput | string
    recipientPubkey?: StringFieldUpdateOperationsInput | string
    success?: BoolFieldUpdateOperationsInput | boolean
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    accessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessLogUncheckedUpdateManyWithoutRewrapKeyInput = {
    id?: IntFieldUpdateOperationsInput | number
    recordCid?: StringFieldUpdateOperationsInput | string
    recipientPubkey?: StringFieldUpdateOperationsInput | string
    success?: BoolFieldUpdateOperationsInput | boolean
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    accessedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}