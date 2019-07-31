const app = new Vue({
  el: '#app',
  data() {
    return {
      colors: [
        {
        name: '#D53738',
          title: 'text'
      }, {
        name: '#638867',
                  title: 'text2'
      }, {
        name: '#FAF429',
                  title: 'text3'
      }],
      current: 0
    }
  },
  mounted() {
    let timeline = anime.timeline({
      autoplay: true,
      duration: 10000,
      easing: 'linear',
      loop: true
    })
    
    this.colors.forEach((color, index) => {
      timeline.add({
        targets: document.querySelectorAll('navisw > div')[index].children[0],
        width: '100%',
        changeBegin: (a) => {
          this.current = index
        }
      })
    })
    
    let hammertime = new Hammer(document.querySelector('#app'))
    
    hammertime.on('press', (e) => {
      timeline.pause()
    })

    hammertime.on('pressup', (e) => {
      timeline.play()
    })
    
    hammertime.on('tap', (e) => {
      if (e.center.x > window.innerWidth / 2) {
        if (this.current < this.colors.length - 1) {
          this.current += 1
          
          timeline.pause()
          timeline.seek(this.current * 10000)
          timeline.play()
        }
      } else {
        if (this.current > 0) {
          this.current -= 1
          
          timeline.pause()
          timeline.seek(this.current * 10000)
          timeline.play()
        }
      }
    })
  }
})
