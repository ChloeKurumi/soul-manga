import React, { Component } from 'react'
import './App.css'
// import Chinese from 'chinese-s2t'
import {
  Button,
  FormControl,
  Glyphicon,
  Form,
  Col,
  Row,
  // Nav,
  // NavItem,
  Image
} from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroller'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
// import { LinkContainer } from 'react-router-bootstrap'
import MangaInfo from './manga-info' // ./必须写，不然找不到，可能去node_moudle里
import ReadPage from './read-page'
// import ReactDOM from 'react-dom'
// import Radium from 'radium'
import $ from 'jquery'
import jQuery from 'jquery'


var DEBUG = true

export const SERVER_SETTING = {
  // 8000是gunicorn, 后面的localhost
  url: DEBUG ? 'http://localhost:8000' : 'http://103.80.29.187:8000',
  // image: 'http://localhost:5000/static/image'
  image: ''
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchKey: '',
      redirect: false
    }
  }

  handleInput(e) {
    // this.props.handleInput(e.target.value)
    // 自己重绘自己
    this.setState({ searchKey: e.target.value })
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      console.log('enter')
      this.setState({ redirect: true })
    }
  }

  render() {
    if (this.state.redirect) {
      console.log('redirect')
      return <Redirect push to={'/search/' + this.state.searchKey} />
    }
    return (
      <Router>
        <Form className="search-bar">
          <Col className="ft1 animated tada" md={2}>
            <Image src="/images/ft.png" />
          </Col>
          <LogoText1 />
          <Col className="ft2 animated tada" md={2}>
            <Image src="/images/ft.png" />
          </Col>
          <Col md={4} mdOffset={0} className="input-control">
            <FormControl
              className="input-text"
              type="text"
              placeholder="search here"
              value={this.state.searchKey}
              onChange={this.handleInput.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
            />
          </Col>
          <Col className="button-control ">
            <Link to={'/search/' + this.state.searchKey} target="_self">
              <Button
                bsStyle="primary"
                className="hvr-buzz"
                /*bsSize="lg"*/ onClick={this.props.handleSearch}
                style={{ height: '3rem', width: '8rem', float: 'left' }}>
                <Glyphicon glyph="search" />
                <span> 来一发</span>
              </Button>
            </Link>
          </Col>
        </Form>
      </Router>
    )
  }
}

class CategoryItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addSpace: true
    }
    this.spaceWith = 1380
  }

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    // console.log(window.innerWidth)
    if (window.innerWidth < this.spaceWith && this.state.addSpace) {
      this.setState({ addSpace: false })
    }

    if (window.innerWidth >= this.spaceWith && !this.state.addSpace) {
      this.setState({ addSpace: true })
    }
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions.bind(this))
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this))
  }

  render() {
    let text
    if (!this.state.addSpace) {
      text = `${this.props.text[0]}${this.props.text[1]}`
    } else {
      text = `${this.props.text[0]} ${this.props.text[1]}`
    }
    // console.log(text)
    return (
      <div className="category-item">
        <div>
          <span>{text}</span>
        </div>
        <Image src="/images/scroll.png" />
      </div>
    )
  }
}

class CategoryBar extends React.Component {
  constructor(props) {
    super(props)
    self.categorys = [
      '格斗',
      '魔法',
      '侦探',
      '竞技',
      '恐怖',
      '战国',
      '魔幻',
      '冒险',
      '校园',
      '搞笑',
      '少女',
      '少男',
      '科幻',
      '港产',
      '其他',
      '全部'
    ]
  }

  // 风扇呼呼的啊卧槽。。。
  /*componentDidMount(){
    jQuery(document).ready(function($){
      // Define a blank array for the effect positions. This will be populated based on width of the title.
      var bArray = []
      // Define a size array, this will be used to vary bubble sizes
      var sArray = [4, 6, 8, 10]

      // Push the header width values to bArray
      for (var i = 0; i < $('.category-nav').width(); i++) {
        bArray.push(i)
      }

      // Function to select random array element
      // Used within the setInterval a few times
      function randomValue(arr) {
        return arr[Math.floor(Math.random() * arr.length)]
      }     
      // setInterval function used to create new bubble every 350 milliseconds
      setInterval(function() {
        // Get a random size, defined as variable so it can be used for both width and height
        var size = randomValue(sArray)
        // New bubble appeneded to div with it's size and left position being set inline
        // Left value is set through getting a random value from bArray
        $('.category-nav').append(
          '<div class="individual-bubble" style="left: ' +
            randomValue(bArray) +
            'px; width: ' +
            size +
            'px; height:' +
            size +
            'px;"></div>'
        )

        // Animate each bubble to the top (bottom 100%) and reduce opacity as it moves
        // Callback function used to remove finsihed animations from the page
        $('.individual-bubble').animate(
          {
            bottom: '100%',
            opacity: '-=0.7'
          },
          3000,
          function() {
            $(this).remove()
          }
        )
      }, 350) 
    })
  }*/

  render() {
    // console.log("fuck width" + $(window).innerWidth())
    return (
      <Router>
        <div className="category-bar">
          <Col md={8} mdOffset={2} className="category-nav">
            {self.categorys.map((v, k) => (
              <Link
                key={'cat' + k}
                to={'/category/' + k}
                className="hvr-wobble-vertical ">
                <CategoryItem text={v} />
              </Link>
            ))}
          </Col>
          <Route exact path="/" component={MangaView} />
          <Route path="/category/:id" component={MangaView} />
          <Route
            path="/search/:key"
            component={MangaView}
            searchKey={this.searchKey}
          />
        </div>
      </Router>
    )
  }

  /*render() {
    return (
      <Router>
        <div className="category-bar" >
          <Col md={8} mdOffset={2} className='category-nav' >
            <Nav bsStyle="pills" onSelect={this.handleCatChange} justified>
              {self.categorys.map((v, k) => (
                <LinkContainer key={'cat' + k} to={'/category/' + k}>
                  <NavItem eventKey={'cat' + k} style={STYLES.navItem}>
                    {v}
                  </NavItem>
                </LinkContainer>
              ))}
            </Nav>
          </Col>
          <Route exact path="/" component={MangaView} />
          <Route path="/category/:id" component={MangaView} />
          <Route
            path="/search/:key"
            component={MangaView}
            searchKey={this.searchKey}
          />
        </div>
      </Router>
    )
  }*/
}

// 本来推荐如果comp里面没有动态的东西的话，应该用箭头格式而不是用类...像router例子里面一样，再说吧
// 应该还是更新MangaView，只不过sql变了
/*class SearchView extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const key = this.props.match.params.key
  }
}*/

class MangaItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    // target='_self'必须要。。为啥？
    // todo 图片转换为320*240不然怎么办啊。。。我日，好他妈奇怪啊，为啥百分比就适配不了, overflow也失效了，你麻痹。。，用background解决了,nice
    return (
      <Router>
        <Col
          className="manga-item hvr-pulse-grow "
          md={2}
          style={{ textAlign: 'center' }}>
          <Link to={`/info/${this.props.data.mid}`} target="_self">
            <div className="manga-item-content">
              <div
                className="manga-item-image"
                style={{
                  backgroundImage: `url(${this.props.data.cover_image}`
                }}
              />
              <span>{this.props.data.name}</span>
            </div>
          </Link>
        </Col>
      </Router>
    )
  }
}

class MangaView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasMoreItems: true,
      items: [],
      category: 1,
      cat_page: 0
    }
    console.log(this.props.route)
  }

  componentWillReceiveProps(nextProps) {
    // 这个方法应该也不要了...路由对了直接在didmount加载才是正确的做法
    this.setState({ hasMoreItems: true, items: [], cat_page: 0 })
    // const key = this.props.match.params.key
  }

  loadItems(page) {
    // console.log(this.props)
    const key = this.props.match.params.key
    // const cat = this.props.match.params.id
    if (this.props.match.params.id || key) {
      if (!this.props.match.params.key) {
        const url = `${SERVER_SETTING.url}/category/${this.props.match.params.id}/${this.state.cat_page++}`
        fetch(url).then(resp => resp.json()).then(json => {
          // console.log("fetch data len " + json.data.length)
          // todo 有可能延迟回来进入了其他tab，这里需要通过返回category和当前category(nav切换)来判断
          for (let i = 0; i < json.data.length; i++) {
            this.loadItemsDetail(page, json.data[i])
          }
          // this.printCurAllItems()
          this.setState({ items: this.state.items })
          // console.log("over " + json.over)
          if (json.over) {
            this.setState({ hasMoreItems: false })
          }
        })
        // test
        // this.setState({ hasMoreItems: false })
      } else {
        // console.log('key: ' + key)
        // search就先全部给了，不分页了
        const url = `${SERVER_SETTING.url}/search/${key}`
        fetch(url).then(resp => resp.json()).then(json => {
          console.log(json)
          this.setState({ items: [] })
          for (let i = 0; i < json.length; i++) {
            this.loadItemsDetail(page, json[i])
          }
          // 一次性返回全部的结果了
          // this.printCurAllItems()
          this.setState({ items: this.state.items, hasMoreItems: false })
        })
      }
    } else {
      // 根路径,用棋魂还是全部呢...
      const url = `${SERVER_SETTING.url}/category/15/${this.state.cat_page++}`
      fetch(url).then(resp => resp.json()).then(json => {
        // console.log("fetch data len " + json.data.length)
        // todo 有可能延迟回来进入了其他tab，这里需要通过返回category和当前category(nav切换)来判断
        for (let i = 0; i < json.data.length; i++) {
          this.loadItemsDetail(page, json.data[i])
        }
        // this.printCurAllItems()
        this.setState({ items: this.state.items })
        // console.log("over " + json.over)
        if (json.over) {
          this.setState({ hasMoreItems: false })
        }
      })
    }
    console.log(
      'load page ' + page + ': current item: ' + this.state.items.length
    )
  }

  printCurAllItems() {
    let res = this.state.items
    for (let i = 0; i < res.length; i++) {
      // console.log(res[i])
      // console.log('fuck ' + res[i].key)
    }
    console.log('fuck length: ' + res.length)
  }

  loadItemsDetail(page, detail) {
    let res = this.state.items
    // console.log('load ' + detail.mid)
    res.push(<MangaItem key={detail.mid} data={detail} />)
  }

  render() {
    // console.log('mangaview render')
    // console.log('MangaView render ' + (tis.props.route ? this.props.route.searchKey : "null"))
    return (
      <Col
        md={8}
        mdOffset={2}
        /*style={STYLES.mangaItem}*/ className="manga-view">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadItems.bind(this)}
          hasMore={this.state.hasMoreItems}
          // loader={<Loader />} // 用自己的，特么直接进入载入所有数据。。。我服
          loader={
            <div className="loader"><img src="/images/loading3.gif" alt="loading" /></div>
          }
          threshold={250}
          style={{ margin: '10px auto' }}
          initialLoad={true}>
          {this.state.items}
        </InfiniteScroll>
      </Col>
    )
  }
}

export class Footer extends React.Component {
  render() {
    return (
      <Col md={12} mdOffset={0} className="footer">
        <span>Copyright © 2017 By ShindouHikaru All Rights Reserve</span>
      </Col>
    )
  }
}

class Home extends React.Component {
  componentDidMount() {}

  constructor(props) {
    super(props)
    this.state = {
      searchKey: ''
    }
  }

  handleSearch() {
    // console.log('search: ' + this.state.searchKey)
    this.setState({ searchKey: this.state.searchKey })
  }

  handleInput(searchKey) {
    this.setState({ searchKey: searchKey })
  }

  render() {
    return (
      <div>
        <Col>
          <SearchBar
            handleSearch={this.handleSearch.bind(this)}
            handleInput={this.handleInput.bind(this)}
            searchKey={this.state.searchKey}
          />
        </Col>
        <CategoryBar />
      </div>
    )
  }
}

export default class SoulManga extends React.Component {
  // render(){
  //   return(<div className="loader"><img src="/images/loading3.gif" /></div>)
  // }

  render() {
    // 这就是说这里的出了category之外，其他都是通过target="_self"，来触发的，因为这些Route没有和Link写在一起
    return (
      <Router>
        <div>
          <Logo />
          <Route exact path="/" component={Home} />
          <Route path="/category/*" component={Home} />
          <Route path="/search/:key" component={Home} />
          <Route path="/fuck" component={Home} />
          <Route path="/info/:id" component={MangaInfo} />
          <Route path="/read/:id/chapter/:chapter" component={ReadPage} />
        </div>
      </Router>
    )
  }
}

class LogoFluid extends React.Component {
  // render() {
  //   return (
  //     <Image src="/images/sasuke_left.png" className="animated fadeInLeft" />
  //   )
  // }

  render() {
    const text = '魂'
    return (
      <div className="logo-fluid animated fadeInLeft">
        <svg viewBox="0 0 100 20" className="">
          <defs>
            <linearGradient id="gradient1" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#F0F8FF" />
              <stop offset="95%" stopColor="#7b68ee" />
            </linearGradient>
            <pattern
              id="wave1"
              x="0"
              y="0"
              width="120"
              height="20"
              patternUnits="userSpaceOnUse">
              <path
                id="wavePath"
                d="M-40 9 Q-30 7 -20 9 T0 9 T20 9 T40 9 T60 9 T80 9 T100 9 T120 9 V20 H-40z"
                mask="url(#mask)"
                fill="url(#gradient1)">
                <animateTransform
                  attributeName="transform"
                  begin="0s"
                  dur="1.5s"
                  type="translate"
                  from="0,0"
                  to="40,0"
                  repeatCount="indefinite"
                />
              </path>
            </pattern>
          </defs>
          <text
            textAnchor="start"
            x="50"
            y="20"
            fontSize="26"
            // fontFamily="Microsoft YaHei"
            fontFamily="&quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif"
            fill="url(#wave1)"
            fillOpacity="1.9">
            {text}
          </text>
          <text
            textAnchor="start"
            x="50"
            y="20"
            fontSize="26"
            // fontFamily="Microsoft YaHei"
            fontFamily="&quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;,
             &quot;WenQuanYi Micro Hei&quot;, sans-serif"
            fill="url(#gradient1)"
            fillOpacity="0.6">
            {text}
          </text>
        </svg>
        <Image src="/images/sasuke_left.png" />
      </div>
    )
  }
}

class LogoFluid2 extends React.Component {
  render() {
    const text = '漫'
    return (
      <div className="logo-fluid animated fadeInRight">
        <Image
          src="/images/naruto_right.png"
        />
        <svg viewBox="0 0 100 20" >
          {/*<defs>
            <linearGradient id="gradient2" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="F0F8FF" />
              <stop offset="95%" stopColor="#7b68ee" />
            </linearGradient>
            <pattern
              id="wave2"
              x="0"
              y="0"
              width="120"
              height="20"
              patternUnits="userSpaceOnUse">
              <path
                id="wavePath"
                d="M-40 9 Q-30 7 -20 9 T0 9 T20 9 T40 9 T60 9 T80 9 T100 9 T120 9 V20 H-40z"
                mask="url(#mask)"
                fill="url(#gradient2)">
                <animateTransform
                  attributeName="transform"
                  begin="0s"
                  dur="1.5s"
                  type="translate"
                  from="0,0"
                  to="40,0"
                  repeatCount="indefinite"
                />
              </path>
            </pattern>
          </defs>*/}
          <text
            textAnchor="end"
            x="50"
            y="20"
            fontSize="26"
            fontFamily="&quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif"
            fill="url(#wave1)"
            fillOpacity="1.9">
            {text}
          </text>
          <text
            textAnchor="end"
            x="50"
            y="20"
            fontSize="26"
            fontFamily="&quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif"
            fill="url(#gradient1)"
            fillOpacity="0.6">
            {text}
          </text>
        </svg>
      </div>
    )
  }
}

class LogoText1 extends React.Component {
  animated(){
    // $('.mast').show()
    (function($) {
      var s,
        spanizeLetters = {
          settings: {
            letters: $('.js-spanize1')
          },
          init: function() {
            s = this.settings
            this.bindEvents()
          },
          bindEvents: function() {
            s.letters.html(function(i, el) {
              //spanizeLetters.joinChars();
              var spanizer = $.trim(el).split('')
              return '<span>' + spanizer.join('</span><span>') + '</span>'
            })
          }
        }
      spanizeLetters.init()
    })(jQuery)

    // 只能一次有效。。。嘛，一次就一次吧
    $('.mast').hover(function() {
      $(this).addClass('magictime puffIn')
    })
  }

  componentDidMount() {
    // $('.mast').hide()
    setTimeout(this.animated, 2000)
  }


  render() {
    return (
      // <main>
      (
        <div className="mast">
          <div className="mast__header">
            <p className="mast__title js-spanize1">我们的童年  一直都在</p>
          </div>
        </div>
      )
      // </main>
    )
  }
}

/*class LogoText2 extends React.Component {
  componentDidMount() {
    ;(function($) {
      var s,
        spanizeLetters = {
          settings: {
            letters: $('.js-spanize')
          },
          init: function() {
            s = this.settings
            this.bindEvents()
          },
          bindEvents: function() {
            s.letters.html(function(i, el) {
              //spanizeLetters.joinChars();
              var spanizer = $.trim(el).split('')
              return '<span>' + spanizer.join('</span><span>') + '</span>'
            })
          }
        }
      spanizeLetters.init()
    })(jQuery)
  }

  render() {
    return (
      (
        <div className="mast">
          <div className="mast__header">
            <h1 className="mast__title js-spanize">我们的童年  一直都在</h1>
            <hr className="sep" />
            <h1 className="mast__text js-spanize">僕たちの笑顔、ずっとここにいる </h1>

          </div>
        </div>
      )
    )
  }
}*/

class Logo extends React.Component {

  componentDidMount(){
    // 我这里不能直接像https://coderwall.com/p/nuzcua/how-i-delayed-timed-animate-css-animations里面这样设置css为none，因为我要用flex，所以我先隐藏就好了
    $('.logo-fluid').hide()
    setTimeout(function () {
        // 没必要addClass，可以直接先写好，因为show的时候自动调用动画了
        // $('.logo-fluid').show().addClass('animated ')}, 1500
        $('.logo-fluid').show()
      }, 1500
    )
  }

  render() {
    return (
      <Col className="logo">
        <Col md={9} className="logo-center">
          <Col md={3} mdOffset={0}>
            <LogoFluid />
          </Col>
          <Col md={6} mdOffset={0}>
            <Image src="/images/logo.png" className="logo-soul  animated rubberBand" />
          </Col>
          {/* 微调0.1rem，视觉差....鸣人头发太亮了，看着高一些*/}
          <Col md={3} mdOffset={0} style={{ top: '0.1rem' }}>
            <LogoFluid2 />
          </Col>
        </Col>
      </Col>
    )
  }

  // render() {
  //   // 原来Col还可以指定left，这个好啊并不好，top/left/bottom/right这样的操作就把整个html扩大了，用margin-left。。。这个情况也会寄出去小数问题就解决了，一般可以用嵌套。。但有的真的嵌套也算不出来。。。
  //   // img src 使用/路径表示的就是public目录下的绝对路径，如果用./ ../之类的是相对当前url下的，这样在read-page就跪了
  //   return (
  //     <Col className="logo">
  //       <Col md={12} style={{ }}>
  //         <Col md={2} mdOffset={1}>
  //           <LogoFluid />
  //         </Col>
  //         <Col className="logo-soul" md={5} mdOffset={0}>
  //           <Image src="/images/logo.png" />
  //         </Col>
  //         {/* 微调0.1rem，视觉差....鸣人头发太亮了，看着高一些*/}
  //         <Col md={2} mdOffset={0} style={{ top: '0.1rem' }}>
  //           <LogoFluid2 />
  //         </Col>
  //       </Col>
  //     </Col>
  //   )
  // }
}

/*class RandomImage extends React.Component {
  constructor(props) {
    super(props)
    // left/top 就是html里面元素的x/y
    this.state = {
      left: 0,
      top: 0
    }
  }

  componentDidMount() {
    // setInterval(this.moveImage.bind(this), 3000)
  }

  moveImage() {
    const newLeft = Math.random() * 1080
    const newRight = Math.random() * 720
    this.setState({ left: newLeft, right: newRight })
  }

  render() {
    const l = this.state.left + 'px'
    const t = this.state.right + 'px'
    return (
      // <div style={{backgroundImage:'./luffy.jpeg'}} > </div>
      (
        <Image
          src="./images/sasuke_left.png"
          style={{ width:'100px', position: 'absolute', left: l, top: t }}
        />
      )
    )
  }
}*/

/*class Bubble extends React.Component {
  componentDidMount() {
    jQuery(document).ready(function($) {
      // Define a blank array for the effect positions. This will be populated based on width of the title.
      var bArray = []
      // Define a size array, this will be used to vary bubble sizes
      var sArray = [4, 6, 8, 10]

      // Push the header width values to bArray
      for (var i = 0; i < $('.category-nav').width(); i++) {
        bArray.push(i)
      }

      // Function to select random array element
      // Used within the setInterval a few times
      function randomValue(arr) {
        return arr[Math.floor(Math.random() * arr.length)]
      }
      // setInterval function used to create new bubble every 350 milliseconds
      setInterval(function() {
        // Get a random size, defined as variable so it can be used for both width and height
        var size = randomValue(sArray)
        // New bubble appeneded to div with it's size and left position being set inline
        // Left value is set through getting a random value from bArray
        $('.category-nav').append(
          '<div class="individual-bubble" style="left: ' +
            randomValue(bArray) +
            'px; width: ' +
            size +
            'px; height:' +
            size +
            'px;"></div>'
        )

        // Animate each bubble to the top (bottom 100%) and reduce opacity as it moves
        // Callback function used to remove finsihed animations from the page
        $('.individual-bubble').animate(
          {
            bottom: '100%',
            opacity: '-=0.7'
          },
          3000,
          function() {
            $(this).remove()
          }
        )
      }, 350)
    })
  }

  render() {
    return (
      <div className="bubbles">
        <h1>Bubbling Header</h1>
      </div>
    )
  }
}*/

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default SoulManga;