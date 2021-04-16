
// import * as d3 from d3
import rd3 from 'react-d3-library'

class BarChart extends React,Component {

  constructor(props){
    super(props);
    this.myRef = React.creatRef();

    componentDidMount(){
      let accessToRef = d3.select(this.myRef.current);
      accessToRef.style("background-color", "green")
    }

    render(){
      return<>
        <div ref=this.myRef> Test </div>
        </>
    }
  }
}
