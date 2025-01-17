<a name="module_autoreader"></a>
## autoreader
Automatically read posts older than the configured interval.

**Author:** RaceProUK  
**License**: MIT  

* [autoreader](#module_autoreader)
  * _static_
    * [.prepare(plugConfig, config, events, browser)](#module_autoreader.prepare)
    * [.start()](#module_autoreader.start)
    * [.stop()](#module_autoreader.stop)
    * [.readify()](#module_autoreader.readify)
  * _inner_
    * [~defaultConfig](#module_autoreader..defaultConfig) : <code>object</code>
      * [.minAge](#module_autoreader..defaultConfig.minAge) : <code>number</code>
      * [.hour](#module_autoreader..defaultConfig.hour) : <code>number</code>
      * [.minute](#module_autoreader..defaultConfig.minute) : <code>number</code>
      * [.randomize](#module_autoreader..defaultConfig.randomize) : <code>boolean</code>
    * [~internals](#module_autoreader..internals) : <code>object</code>
      * [.browser](#module_autoreader..internals.browser) : <code>Browser</code>
      * [.config](#module_autoreader..internals.config) : <code>object</code>
      * [.timer](#module_autoreader..internals.timer) : <code>object</code>
      * [.events](#module_autoreader..internals.events) : <code>externals.events.SockEvents</code>

<a name="module_autoreader.prepare"></a>
### autoreader.prepare(plugConfig, config, events, browser)
Prepare Plugin prior to login

**Kind**: static method of <code>[autoreader](#module_autoreader)</code>  

| Param | Type | Description |
| --- | --- | --- |
| plugConfig | <code>\*</code> | Plugin specific configuration |
| config | <code>Config</code> | Overall Bot Configuration |
| events | <code>externals.events.SockEvents</code> | EventEmitter used for the bot |
| browser | <code>Browser</code> | Web browser for communicating with discourse |

<a name="module_autoreader.start"></a>
### autoreader.start()
Start the plugin after login

**Kind**: static method of <code>[autoreader](#module_autoreader)</code>  
<a name="module_autoreader.stop"></a>
### autoreader.stop()
Stop the plugin prior to exit or reload

**Kind**: static method of <code>[autoreader](#module_autoreader)</code>  
<a name="module_autoreader.readify"></a>
### autoreader.readify()
Autoread posts worker method; gets the list of accessible topics, then scans each in turn,
reading any unread posts it finds that are older than the configured interval.

**Kind**: static method of <code>[autoreader](#module_autoreader)</code>  
<a name="module_autoreader..defaultConfig"></a>
### autoreader~defaultConfig : <code>object</code>
Default configuration settings

**Kind**: inner typedef of <code>[autoreader](#module_autoreader)</code>  

  * [~defaultConfig](#module_autoreader..defaultConfig) : <code>object</code>
    * [.minAge](#module_autoreader..defaultConfig.minAge) : <code>number</code>
    * [.hour](#module_autoreader..defaultConfig.hour) : <code>number</code>
    * [.minute](#module_autoreader..defaultConfig.minute) : <code>number</code>
    * [.randomize](#module_autoreader..defaultConfig.randomize) : <code>boolean</code>

<a name="module_autoreader..defaultConfig.minAge"></a>
#### defaultConfig.minAge : <code>number</code>
How old a post must be to be auro-read

**Kind**: static property of <code>[defaultConfig](#module_autoreader..defaultConfig)</code>  
<a name="module_autoreader..defaultConfig.hour"></a>
#### defaultConfig.hour : <code>number</code>
The hour of the day to run the autoreader in UTC (0-23)

**Kind**: static property of <code>[defaultConfig](#module_autoreader..defaultConfig)</code>  
**Default**: <code>0</code>  
<a name="module_autoreader..defaultConfig.minute"></a>
#### defaultConfig.minute : <code>number</code>
The minute of the hour to run the autoreader in UTC (0-59)

**Kind**: static property of <code>[defaultConfig](#module_autoreader..defaultConfig)</code>  
**Default**: <code>0</code>  
<a name="module_autoreader..defaultConfig.randomize"></a>
#### defaultConfig.randomize : <code>boolean</code>
Randomise the time of day the autoreader runs (if set, overrides `hour` and `minute`)

**Kind**: static property of <code>[defaultConfig](#module_autoreader..defaultConfig)</code>  
**Default**: <code>true</code>  
<a name="module_autoreader..internals"></a>
### autoreader~internals : <code>object</code>
Internal status store

**Kind**: inner typedef of <code>[autoreader](#module_autoreader)</code>  

  * [~internals](#module_autoreader..internals) : <code>object</code>
    * [.browser](#module_autoreader..internals.browser) : <code>Browser</code>
    * [.config](#module_autoreader..internals.config) : <code>object</code>
    * [.timer](#module_autoreader..internals.timer) : <code>object</code>
    * [.events](#module_autoreader..internals.events) : <code>externals.events.SockEvents</code>

<a name="module_autoreader..internals.browser"></a>
#### internals.browser : <code>Browser</code>
Browser to use for communication with discourse

**Kind**: static property of <code>[internals](#module_autoreader..internals)</code>  
<a name="module_autoreader..internals.config"></a>
#### internals.config : <code>object</code>
Instance configuration

**Kind**: static property of <code>[internals](#module_autoreader..internals)</code>  
<a name="module_autoreader..internals.timer"></a>
#### internals.timer : <code>object</code>
Used to stop the autoreading when the plugin is stopped

**Kind**: static property of <code>[internals](#module_autoreader..internals)</code>  
<a name="module_autoreader..internals.events"></a>
#### internals.events : <code>externals.events.SockEvents</code>
EventEmitter used for internal communication

**Kind**: static property of <code>[internals](#module_autoreader..internals)</code>  
