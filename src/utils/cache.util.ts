
import * as cacheManager from 'cache-manager';

const memoryCache = cacheManager.caching({store: 'memory', max: 100, ttl: 10/*seconds*/});


export class Cache {
    
    static async remember(key: string, ttl: number, callback: CallableFunction): Promise<any> {
        console.log(key)
        var getData = await memoryCache.get(key)

        if(getData == undefined) {
            
            getData = await callback()

            await memoryCache.set(key, JSON.stringify(getData), {ttl: ttl});
            console.log('from callback');
        } else {
            console.log('from cache');
            
            if(!(getData instanceof Object)) {
                getData = JSON.parse(getData)
            }
        }

        return getData;
    }

    static async del(key: string): Promise<void> {
        await memoryCache.del(key);
    }
}