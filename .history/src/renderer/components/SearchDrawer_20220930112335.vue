<template>
  <search-bar class="dialog-drawer-search" :value="search.query" @query="handleDSearchQueryClick" />
  <div class="search-list" v-if="search.display">
    <!-- sandbox="allow-scripts allow-forms allow-same-origin allow-top-navigation" -->
    <!-- <iframe
          class="search-iframe"
          :src="`https://www.baidu.com/s?wd=${search.query}`"
          frameborder="0"
          ref="oneIframe"
        ></iframe> -->
    <webView
      class="search-iframe"
      :src="`https://www.baidu.com/s?wd=${search.query}`"
      allowpopups
      ref="oneIframe"
    ></webView>
    <!-- preload="../assets/script/reset-baidu-script.js" -->
    <!-- sandbox="allow-scripts allow-forms allow-same-origin allow-top-navigation" -->
    <!-- <iframe
          class="search-iframe"
          :src="`https://m.cn.bing.com/search?q=${search.query}&ensearch=1`"
          frameborder="0"
          ref="twoIframe"
        >
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </iframe> -->
    <webView
      class="search-iframe"
      :src="`https://m.cn.bing.com/search?q=${search.query}&ensearch=1`"
      allowpopups
      ref="oneIframe"
    ></webView>
    <!-- sandbox="allow-s÷cripts allow-forms allow-same-origin allow-top-navigation" -->
    <!-- <iframe
          class="search-iframe"
          :src="`https://www.sogou.com/web?query=${search.query}`"
          frameborder="0"
          ref="theIframe"
        ></iframe> -->
    <webView
      class="search-iframe"
      :src="`https://www.sogou.com/web?query=${search.query}`"
      allowpopups
      ref="oneIframe"
    ></webView>
  </div>
</template>
