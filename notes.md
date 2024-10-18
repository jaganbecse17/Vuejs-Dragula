# Vue.js Notes

## router

> import router from "@/router" - not from (router/index.js)
> path:"/screen/:id -> props (add props to prevent on refresh, proper way)
> code--- about/dragula?id=1 ---id(query) ,dragula(props)

### router gaurd

> specify to,from,next
> next() - for navigate (... middleware)

## parent-child

> emit has no return value
> emit payload validation
> $emit("prop name") - use in parent on child comp tag v-on:props
> slot - include content inside child comp' in parent comp
> slot - named , default
> $parent vs $emit

## computed

> function without triggering them
> they invoked when data changes

## Events

> create and destory propery - lifecycle
> inline (event)=>{}
> $event special variable

## Vuex

> mutation -> commit to store - only way to update store (sync)
> action -> (dispatch) logic to commit (async /sync)
> getters -> access store value along with function logic -1st params(state),...(other getters)
> mapGetters -> array of getters - compontent(compute) - import from vuex
> mapaction -> array of action - compontent(compute) - import from vuex
> modules - namespaced:true -> commit('module_name/mutation_name)
> get inter module value in store index file from that module

## dotenv variables

> add VUE_APP before every variable
> hot reload not work adding new variable - re-run
> .env[stage] -> for build (NODE_ENV = production)
> .env[stage].local -> for run (NODE_ENV = development)
> set stage script in package.json file

## storage

> localstorage - 5mb - not cleared
> sessionstorage - tab only & time expire
> cookie - used by server/client - timeout

## vuetable-2

> instal fontawsome icons
> sort icon -> add sortField
> tableclass -> custom style - table td /th ...

## API structure

> api list
> sample format :
> {
> url:'',payload:'',method:'',doc:'',store:'',mutation:''
> }

> store api method based function

## eslint

> rules

## bable

## cors

> Local CORS Proxy
> lcp --proxyUrl <Domain>
