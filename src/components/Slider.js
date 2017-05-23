import React from 'react';
import './Slider.less';
export default class Slider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pos : 0
        }
    }
    turn(n){
        let pos = this.state.pos;
        pos += n;
        if(pos>=this.props.images.length){
            pos = 0;
        }else if(pos<0){
            pos = this.props.images.length - 1;
        }
        this.setState({pos});
    }
    play(){
        this.$timer = setInterval(()=>{
            this.turn(1);
        },this.props.interval*1000);

    }
    componentDidMount(){
        if(this.props.autoPlay){
            this.play();
        }
    }
    render(){
        let images = this.props.images;
        let style = {
            left : this.state.pos * (-200),
            width : images.length * 200,
            transitionDuration : this.props.speed + 's'
        };
        let arrows = null;
        if(this.props.arrows){
            arrows = (
                <div className="arrows">
                    <span onClick={()=>(this.turn(-1))} className="arrow arrow-left">&lt;</span>
                    <span onClick={()=>(this.turn(1))} className="arrow arrow-right">&gt;</span>
                </div>
            );
        }
        let dots = null;
        if(this.props.dots){
            dots = (
              <div className="dots">
                  {
                      images.map((image,index)=>(
                          <span key={index} className={"dot " + (index == this.state.pos?'active':'')} onClick={()=>this.turn(index-this.state.pos)}></span>
                      ))
                  }
              </div>
            );
        }
        return(
            <div onMouseEnter={this.props.pause?()=>{clearInterval(this.$timer)}:''} onMouseLeave={this.props.pause?()=>this.play():''} className="wrapper">
                <ul style={style} className="sliders">
                    {
                        images.map((image,index)=>(
                            <li className="slider"  key={index} >
                                <img src={image.src}/>
                            </li>
                            )
                        )
                    }
                </ul>
                {arrows}
                {dots}
            </div>
        )
    }
}