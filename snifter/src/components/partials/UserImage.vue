<template>
  <div>
    <div class="profilepic mb-3">
      <img :src="src" alt="Avatar" class="preview-image profilepic__image" />
      <div class="profilepic__content">
        <span class="profilepic__icon"><i class="fas"></i></span>
        <span class="profilepic__text" @click="browse">Change Photo</span>
      </div>
    </div>
    <input
      type="file"
      accept="image/*"
      ref="file"
      button="hide"
      @change="change"
      hidden
    />
  </div>
</template>

<script>
import { Storage, API } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import { Auth } from "aws-amplify";
import awsExports from "../../aws-exports";
import { getUser } from "../../graphql/queries";
import stockavatar from "../../assets/stockavatar.png";
import { store } from "../../store/store.js";
export default {
  name: "SignIn",
  components: {},
  data() {
    return {
      imgKey: this.imgKey,
      username: this.username,
      src: null,
      store,
    };
  },
  props: {
    modelValue: File,
    defaultSrc: String,
  },
  async created() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      let username = user.username;
      this.username = username;
      this.imgKey = "profile-image-" + this.username;
      // Get user
      const userData = await API.graphql({
        query: getUser,
        variables: {
          id: username,
        },
      });
      let hasImage = userData.data.getUser.hasImage;
      console.log(hasImage);
      if (hasImage) {
        this.src = await Storage.get(this.imgKey, {
          level: "public",
          bucket: awsExports.aws_user_files_s3_bucket,
          region: awsExports.aws_user_files_s3_bucket_region,
        });
        this.store.src = this.src;
        this.store.isLoggedIn = true;
      } else {
        this.src = stockavatar;
      }
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    browse() {
      this.$refs.file.click();
    },
    change(e) {
      const file = e.target.files[0];
      var fileName = "profile-image-" + this.username;
      Storage.put(fileName, file, {
        contentType: "image/png",
      })
        .then(() => {
          const image = {
            image: {
              bucket: awsExports.aws_user_files_s3_bucket,
              region: awsExports.aws_user_files_s3_bucket_region,
              key: fileName,
            },
          };
          addImageToDB(this.username, image).then(() => {
            this.$router.go();
          });
        })
        .catch((err) => console.log(err));
    },
  },
};
async function addImageToDB(username, image) {
  const bucket = image.image.bucket;
  const region = image.image.region;
  const key = image.image.key;
  console.log("addImageToDB");
  try {
    const userDetails = {
      id: username,
      hasImage: true,
    };
    await API.graphql({
      query: mutations.updateUser,
      variables: { input: userDetails },
    });
    await API.graphql({
      query: mutations.createS3Object,
      variables: {
        input: { id: username, bucket: bucket, region: region, key: key },
      },
    });
    console.log("reached");
  } catch (e) {
    console.error(e);
  }
}
</script>

<style scoped>
.is-purple {
  color: #6f36bc;
  font-weight: 500;
}
.profilepic {
  position: relative;
  margin: 0 auto;
  width: 125px;
  height: 125px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #111;
}
.profilepic:hover .profilepic__content {
  opacity: 1;
}
.profilepic:hover .profilepic__image {
  opacity: 0.5;
}
.profilepic__image {
  opacity: 1;
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: opacity 0.2s ease-in-out;
}
.profilepic__content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}
.profilepic__icon {
  color: white;
  padding-bottom: 8px;
}
.fas {
  font-size: 20px;
  cursor: pointer;
}
.profilepic__text {
  text-transform: uppercase;
  font-size: 12px;
  width: 50%;
  text-align: center;
  cursor: pointer;
}
</style>
