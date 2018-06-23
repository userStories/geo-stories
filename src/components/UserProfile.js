import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, MapView, View, Button, Image, Dimensions, ScrollView } from 'react-native';
import axios from 'axios'

const { height } = Dimensions.get('window')

console.log(Dimensions.get('window'))

const user = {
  email: 'user@gmail.com',
  firstName: 'Sumpy',
  lastName: 'Pete',
  profileImg: 'https://i1.wp.com/www.thisblogrules.com/wp-content/uploads/2010/02/batman-for-facebook.jpg?resize=250%2C280',
  tagline: 'woohoo',
  locationStr: 'Chicago',
  myPhotoArr: ['https://static.boredpanda.com/blog/wp-content/uploads/2016/07/funny-men-parody-women-photos-15-5799e76231d15__605.jpg', 'https://www.istockphoto.com/resources/images/PhotoFTLP/img_82250973.jpg', 'https://media.istockphoto.com/photos/hands-forming-a-heart-shape-with-sunset-silhouette-picture-id636379014?k=6&m=636379014&s=612x612&w=0&h=tnYrf_O_nvT15N4mmjorIRvZ7lK4w1q1c7RSfrVmqKA=', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC5oq_1Bvfc6yotil2etXyPRQYUquhXFMwL94EVqND8iKFdWG1', 'https://images.unsplash.com/photo-1496256262343-119c77010f6b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4411323d4cda1a5798bc1bb3a8c2b535&w=1000&q=80', 'https://images.unsplash.com/photo-1496256262343-119c77010f6b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4411323d4cda1a5798bc1bb3a8c2b535&w=1000&q=80', 'https://images.unsplash.com/photo-1496256262343-119c77010f6b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4411323d4cda1a5798bc1bb3a8c2b535&w=1000&q=80', 'https://images.unsplash.com/photo-1496256262343-119c77010f6b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4411323d4cda1a5798bc1bb3a8c2b535&w=1000&q=80', 'https://static.boredpanda.com/blog/wp-content/uploads/2016/07/funny-men-parody-women-photos-15-5799e76231d15__605.jpg', 'https://media.istockphoto.com/photos/hands-forming-a-heart-shape-with-sunset-silhouette-picture-id636379014?k=6&m=636379014&s=612x612&w=0&h=tnYrf_O_nvT15N4mmjorIRvZ7lK4w1q1c7RSfrVmqKA=', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC5oq_1Bvfc6yotil2etXyPRQYUquhXFMwL94EVqND8iKFdWG1', 'https://media.istockphoto.com/photos/hands-forming-a-heart-shape-with-sunset-silhouette-picture-id636379014?k=6&m=636379014&s=612x612&w=0&h=tnYrf_O_nvT15N4mmjorIRvZ7lK4w1q1c7RSfrVmqKA=', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC5oq_1Bvfc6yotil2etXyPRQYUquhXFMwL94EVqND8iKFdWG1', 'https://media.istockphoto.com/photos/hands-forming-a-heart-shape-with-sunset-silhouette-picture-id636379014?k=6&m=636379014&s=612x612&w=0&h=tnYrf_O_nvT15N4mmjorIRvZ7lK4w1q1c7RSfrVmqKA=', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC5oq_1Bvfc6yotil2etXyPRQYUquhXFMwL94EVqND8iKFdWG1', 'https://media.istockphoto.com/photos/hands-forming-a-heart-shape-with-sunset-silhouette-picture-id636379014?k=6&m=636379014&s=612x612&w=0&h=tnYrf_O_nvT15N4mmjorIRvZ7lK4w1q1c7RSfrVmqKA=', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC5oq_1Bvfc6yotil2etXyPRQYUquhXFMwL94EVqND8iKFdWG1', 'https://media.istockphoto.com/photos/hands-forming-a-heart-shape-with-sunset-silhouette-picture-id636379014?k=6&m=636379014&s=612x612&w=0&h=tnYrf_O_nvT15N4mmjorIRvZ7lK4w1q1c7RSfrVmqKA=', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC5oq_1Bvfc6yotil2etXyPRQYUquhXFMwL94EVqND8iKFdWG1', 'https://media.istockphoto.com/photos/hands-forming-a-heart-shape-with-sunset-silhouette-picture-id636379014?k=6&m=636379014&s=612x612&w=0&h=tnYrf_O_nvT15N4mmjorIRvZ7lK4w1q1c7RSfrVmqKA=', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC5oq_1Bvfc6yotil2etXyPRQYUquhXFMwL94EVqND8iKFdWG1'],

}

class UserProfile extends Component {
  render() {
    return (
      <View>
        <Image
          source={{ uri: user.profileImg }}
          style={{ width: 125, height: 125, borderRadius: 62.5, margin: 4 }} />
        <Text
          style={{fontFamily: 'Cochin-Bold'}}
        >{user.firstName + ' ' + user.lastName}</Text>
        <ScrollView
          vertical
          pagingEnabled >
          <View
            style={{
              height: height + 338,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
              
            }}>
            {
              user.myPhotoArr.map(photo =>
                <View
                  style={{marginBottom: 4, marginTop: 4}}>
                  <Image key={photo[18]}
                    source={{ uri: photo }}
                    style={{ width: 113, height: 113 }}
                  />
                </View>
              )
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default UserProfile
