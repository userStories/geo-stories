import React, { Component } from "react";
import { Image, Dimensions, StyleSheet, Text, View, Linking, Picker } from "react-native";
import { MapView } from "expo";
import { connect } from "react-redux"
import { getAllPostsThunk, getSinglePostThunk, getAllCategoriesThunk, filterIdThunk } from '../store'
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog'
import { Button } from 'react-native-elements'

class MyMap extends Component {

    state = {
        focusedLocation: {
            latitude: 41.89557129,
            longitude: -87.6386050932,
            latitudeDelta: 0.00522,
            longitudeDelta:
                Dimensions.get('window').width /
                Dimensions.get('window').height * 0.00522

        }
    }

    componentDidMount() {
        this.props.viewAllPosts()
        this.props.viewAllCategories()
    }
    pickLocationHandler = (event) => {
        const coords = event.nativeEvent.coordinate;
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                }
            }
        })
    }

    render() {
        console.log('this.props.allPosts in MyMap component: ', this.props.allPosts)
        console.log('this.props.allCategories: ', this.props.allCategories)
        // let filter = null;
        const categoryFilterButton = () => <Text>Category Filter</Text>
        const postButton = () => <Text>Post</Text>
        const locateButton = () => <Text>Locate Me</Text>
        const buttonGroup = [{element: categoryFilterButton}, {element: postButton}, {element: locateButton}]
        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={this.state.focusedLocation}
                    region={this.state.focusedLocation}
                    style={styles.map}
                    onPress={this.pickLocationHandler}
                >
                    {!!this.props.filterId === false ? this.props.allPosts.map((marker, index) => {
                        let newCoord = {
                            latitude: marker.latitude,
                            longitude: marker.longitude
                        }
                        return (
                            <MapView.Marker
                                key={index}
                                coordinate={newCoord}
                                // title={marker.title}
                                // description={marker.text}
                                // onPress={() => this.props.navigation.navigate('SinglePost', { id: marker.id })}
                                onPress={() => {
                                    console.log('marker.id: ', marker.id)
                                    this.props.viewSinglePost(marker.id)
                                    this.popupDialog.show();
                                }}
                            >
                            </MapView.Marker>

                        );
                    }) :
                        this.props.allPosts.map((marker, index) => {
                            let newCoord = {
                                latitude: marker.latitude,
                                longitude: marker.longitude
                            }
                            if (marker.categoryId === this.props.filterId) {
                                return (

                                    <MapView.Marker
                                        key={index}
                                        coordinate={newCoord}
                                        // title={marker.title}
                                        // description={marker.text}
                                        // onPress={() => this.props.navigation.navigate('SinglePost', { id: marker.id })}
                                        onPress={() => {
                                            console.log('marker.id: ', marker.id)
                                            this.props.viewSinglePost(marker.id)
                                            this.popupDialog.show();
                                        }}
                                    >
                                    </MapView.Marker>

                                );
                            }
                        })

                    }
                </MapView>
                <PopupDialog
                    width={0.7}
                    height={0.07}
                    overlayOpacity={0.6}
                    haveTitleBar={true}
                    ref={(popupDialog) => { this.popupDialog = popupDialog }}>
                    <View style={styles.container}>
                        <Text style={styles.title}>{this.props.singlePost.title}</Text>
                        {/* <Text>{this.props.singlePost.text}</Text> */}
                        <Text style={styles.link} onPress={() => this.props.navigation.navigate('SinglePost', { id: this.props.singlePost.id })}>Post Link</Text>
                    </View>
                </PopupDialog>
                <View style={styles.button}>
                    <View><Button title='Category Filter' buttonStyle={styles.filterButton} onPress={() => this.popupDialog2.show()}/></View>
                    <View><Button title="Post" buttonStyle={styles.buttonPost} /></View>
                    <View><Button title="Locate Me" buttonStyle={styles.buttonLocate} onPress={() => alert('Pick Location lat:' + this.state.focusedLocation.latitude + ' long:' + this.state.focusedLocation.longitude)} /></View>
                </View>
                    <PopupDialog
                        width={0.5}
                        height={0.3}
                        overlayOpacity={0.6}
                        haveTitleBar={true}
                        ref={(popupDialog) => { this.popupDialog2 = popupDialog }}>
                        <View style={styles.container}>
                            <Text style={styles.title}>Category Filter</Text>
                            {/* <Text onPress={() => this.props.changeFilterId(0)}>All</Text>
                            {this.props.allCategories.map(category =>{
                                return <Text style={styles.filterText} onPress={() => this.props.changeFilterId(category.id)}>{category.title}</Text>
                            })} */}
                             <Picker
                              selectedValue={this.props.filterId}
                              style={{ height: 100, width: 100 }}
                              onValueChange={(itemValue, itemIndex) => this.props.changeFilterId(itemValue)}>
                              <Picker.Item label="All" value={0} />
                              {this.props.allCategories.map(category =>{
                              return <Picker.Item label={category.title} value={category.id} />
                            })}
                          </Picker> 
                        </View>
                    </PopupDialog>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    map: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "100%",
        height: "90%"
    },
    button: {
        margin: 8,
        flexDirection: 'row',
        // alignSelf: 'flex-start',
        alignItems: "center"
    },
    filterButton: {
        backgroundColor: "green",
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    link: {
        color: 'black',
        fontSize: 16
    },
    buttonPost: {
        backgroundColor: "red",
    },
    buttonLocate: {
        backgroundColor: "blue",
    },
    filterText: {
        
    }
});


const mapStateToProps = state => {
    return {
        allPosts: state.postReducer.allPosts,
        singlePost: state.postReducer.singlePost,
        allCategories: state.categoryReducer.allCategories,
        filterId: state.categoryReducer.filterId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        viewAllPosts: () => dispatch(getAllPostsThunk()),
        viewSinglePost: (postId) => dispatch(getSinglePostThunk(postId)),
        viewAllCategories: () => dispatch(getAllCategoriesThunk()),
        changeFilterId: (filterId) => dispatch(filterIdThunk(filterId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMap)

