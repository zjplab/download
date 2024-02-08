parsers:
    - url: 
  
      code: |
        module.exports.parse = (raw, { yaml, console }) => {
        const rawObj = yaml.parse(raw)
        let { proxies=[], rules = [], 'proxy-groups': proxy = []} = rawObj
  
        //rules to modify
        const rulesMap={
          "DOMAIN-SUFFIX,pornhub.com,🚀 国外流量": "DOMAIN-SUFFIX,pornhub.com,Pornhub",
          "DOMAIN-SUFFIX,phncdn.com,🚀 国外流量": "DOMAIN-SUFFIX,phncdn.com,Pornhub",
          "DOMAIN-SUFFIX,phprcdn.com,🚀 国外流量": "DOMAIN-SUFFIX,phprcdn.com,Pornhub",
          "DOMAIN-SUFFIX,pornhubpremium.com,🚀 国外流量": "DOMAIN-SUFFIX,pornhubpremium.com,Pornhub",
        }
        rules.forEach((elem, index)=>{rules[index]=(rulesMap.hasOwnProperty(elem))? rulesMap[elem]:elem;}) 
        //rules.forEach((elem, index)=>{console.log(elem)})

        //rules to append
        // rules.push("DOMAIN-SUFFIX,cloudfront.net,大机场 Big Airport")
        // rules.push("DOMAIN-SUFFIX,bbc.com,大机场 Big Airport")
        // rules.push("DOMAIN-SUFFIX,nr-data.net,大机场 Big Airport")
        // rules.push("DOMAIN-SUFFIX,edx.org,大机场 Big Airport")
        // rules.push("DOMAIN-SUFFIX,edx-video.net,大机场 Big Airport")
        rules.push('DOMAIN-SUFFIX,pnc.com,🚀 国外流量')
        let real_proxies = proxies.filter((elem)=>{return elem.name.includes("【") || elem.name.includes("香港")})
        let real_proxies_names = real_proxies.map((elem)=>{return elem.name})
        proxy.push({"name":"Pornhub","type":"select","proxies":real_proxies_names})
        proxy.forEach((elem, index)=>{ 
            console.log(elem.name)
            switch(elem.name){
              case "📲 Telegram":
                proxy[index].type="url-test"
                proxy[index].url="91.108.56.172"
                proxy[index].interval=1
                proxy[index].tolerance=50
                // if(proxy[index].hasOwnProperty("url")) proxy[index].url="https://www.youtube.com/generate_204"
                break;
              case "🎵 TikTok":
                proxy[index].type="url-test"
                proxy[index].url="https://www.tiktok.com"
                proxy[index].interval=1
                proxy[index].tolerance=50
                let tiktok_proxies = proxies.filter((elem)=>{return !elem.name.includes("香港") && !elem.name.includes("HK")})
                let tiktok_proxies_names = tiktok_proxies.map((elem)=>{return elem.name})
                proxy[index].proxies=tiktok_proxies_names
                break;
              case "Ⓜ️ 微软云盘":
                proxy[index].type="url-test"
                proxy[index].url="sharepoint.com"
                proxy[index].interval=1
                proxy[index].tolerance=50
                proxy[index].proxies=proxy[index].proxies.concat(real_proxies_names)
                break;
              case "🎵 Spotify":
                proxy[index].type="url-test"
                proxy[index].url="audio-fa.scdn.co"
                proxy[index].interval=1
                proxy[index].tolerance=50
                break;
              case "Pornhub":
                proxy[index].type="url-test"
                proxy[index].url="phncdn.com"
                proxy[index].interval=1
                proxy[index].tolerance=50
                break;
            }
            if(proxy[index].hasOwnProperty("interval")) proxy[index].interval=1
        }) 
         
        return yaml.stringify({ ...rawObj, 'proxies':proxies, 'proxy-groups': proxy,'rules': rules}) }
