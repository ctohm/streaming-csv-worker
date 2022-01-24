module.exports = {
    title: '🔃 Streaming CSV Workers',
    description: 'Zero Copy Conversion from CSV to JSON',
    base:'/',
    themeConfig: {
      repo:'ctohm/streaming-csv-workers',
      docsDir:'docs',
      sidebar: {
         
        '/': getGuideSidebar()
      },
      nav: [ 
        {  text:'Cloudflare Workers',link:'https://developers.cloudflare.com/workers/'      }
      ]
    }
  }

  function getGuideSidebar() {
    return   [
          { text: '💥 The Problem', link: 'motivation' },
          { text: '🔃 The Edge Alternative', link: 'the_edge_alternative' },
          
          { text: '💻 Benchmark Setup',link:'benchmark_setup'},
          { text: '📈 Benchmark Results',link:'benchmark_results'},
          { text: '⬇️ FetchStreamer', link: 'fetch_streamer' },
          { text: '🔃 TransformStreamer', link: 'transform_streamer' },
          { text: '🔳 CSVParStreamer',link:'csvparser_streamer'},
        ]
    }


    