parsers:
    - url: 
  
      code: |
        module.exports.parse = (raw, { yaml, console }) => {
        const rawObj = yaml.parse(raw)
        let { proxies=[], rules = [], 'proxy-groups': proxy_group = []} = rawObj
        proxies.forEach(proxy => {console.log(proxy.name);}); //debug and print all the proxy names
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
        proxy_group.push({"name":"Pornhub","type":"select","proxies":real_proxies_names})
        proxy_group.forEach((elem, index)=>{ 
            // console.log(elem.name)
            switch(elem.name){
              case "📲 Telegram":
                proxy_group[index].type="url-test"
                proxy_group[index].url="91.108.56.172"
                proxy_group[index].interval=1
                proxy_group[index].tolerance=50
                // if(proxy_group[index].hasOwnProperty("url")) proxy_group[index].url="https://www.youtube.com/generate_204"
                break;
              case "🎵 TikTok":
                proxy_group[index].type="url-test"
                proxy_group[index].url="https://www.tiktok.com"
                proxy_group[index].interval=1
                proxy_group[index].tolerance=50
                let tiktok_proxies = proxies.filter((elem)=>{return !elem.name.includes("香港") && !elem.name.includes("HK")})
                let tiktok_proxies_names = tiktok_proxies.map((elem)=>{return elem.name})
                proxy_group[index].proxies=tiktok_proxies_names
                break;
              case "Ⓜ️ 微软云盘":
                proxy_group[index].type="url-test"
                proxy_group[index].url="sharepoint.com"
                proxy_group[index].interval=1
                proxy_group[index].tolerance=50
                // proxy_group[index].proxies=proxy_group[index].proxies.concat(real_proxies_names)
                proxy_group[index].proxies=proxies.map(proxy => proxy.name);
                break;
              case "🎵 Spotify":
                proxy_group[index].type="url-test"
                proxy_group[index].url="audio-fa.scdn.co"
                proxy_group[index].interval=1
                proxy_group[index].tolerance=50
                break;
              case "Pornhub":
                proxy_group[index].type="url-test"
                proxy_group[index].url="phncdn.com"
                proxy_group[index].interval=1
                proxy_group[index].tolerance=50
                // Create a new array with just the names of the proxies
                proxy_group[index].proxies = proxies.map(proxy => proxy.name);
                break;
            }
            if(proxy_group[index].hasOwnProperty("interval")) proxy_group[index].interval=1
        }) 
         
        return yaml.stringify({ ...rawObj, 'proxies':proxies, 'proxy-groups': proxy_group,'rules': rules}) }
