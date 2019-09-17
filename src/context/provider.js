import Context from './context';

class Provider extends Component {
    state = {
        data:[],
        query:"MetroLine = 'Expo Line'",
        fieldList:[],
        metrolineList:["a", "b"],
        stationList:["a", "b"],
        dataUrl:"http://maps.lacity.org/lahub/rest/services/Metro_Bus_and_Rail/MapServer/1/query?",
        markerPosition:[33.8, -117.8]//[49.8419, 24.0315]
            }

    render() {
        return (
            <Context.Provider>
                value={{
                    data: this.state.data,
                    firstLoadData:()=>{
                        let query = {params:{f:'json', outFields:'*', where:"1<>1", returnGeometry: "true",
                        outSpatialReference:4326,
                        orderByFields: "MetroLine"}}
                        axios.get(this.state.dataUrl, query)
                        .then(res=>{
                            const newList = res.data.features.map((feature)=>{
                                return feature//.attributes.MetroLine
                            })
                            this.setState({data:newList})
                        });
                    },
                    updateData:()=>{
                        let query = {params:{f:'json', outFields:'*', where: this.state.query, returnGeometry: "true",
                        outSR: "4326",
                        orderByFields: "MetroLine", returnDistinctValues: false}}
                        axios.get(this.state.dataUrl, query)
                        .then(res=>{
                            console.log(res.data)
                            const newList = res.data.features.map((feature)=>{
                                return feature
                            });
                            this.setState({data:newList})
                        });
                    }
                }}
            </Context.Provider>
            <Context.Provider
                value={{
                    cars: this.state.cars,
                    incrementPrice: selectedID => {
                        const cars = Object.assign({}, this.state.cars);
                        cars[selectedID].price = cars[selectedID].price + 1;
                        this.setState({
                            cars
                        });
                    },
                    decrementPrice: selectedID => {
                        const cars = Object.assign({}, this.state.cars);
                        cars[selectedID].price = cars[selectedID].price - 1;
                        this.setState({
                            cars
                        });
                    }
                }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}