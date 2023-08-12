const { User } = require('../models');

const resolvers = {
    Query: {
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },

        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent, {username, email, password }) => {
            const profile = await Profile.create({ name, email, password });
            const token = signToken(profile);
            return { token, profile };
        },
        login: async (parent, { email, passwork }) => {
            const user = await User.findOne({ email });
            if(!user) {
                throw new AuthenticationError('No user with this email found!');
            }

            const correctPw = await user.isCorrectPassword(passwork);
            if(!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }
            const token = signToken(user);
            return { token, user }
        }
    }
}