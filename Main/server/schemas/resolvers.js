const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      users: async () => {
        return User.find();
      },

      user: async (parent, { userId }) => {
        return User.findOne({ _id: userId });
      },

      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).select('-__v -password').populate("savedBooks");
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    },
  
    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },

      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('No user found with this email address');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
      },

      addBook: async (parent, { bookToSave }, context) => {
        if (context.user) {
          const updatedBooks = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: bookToSave } },
            { new: true }
          ).populate('savedBooks');
  
          return updatedBooks;
        }
        throw new AuthenticationError('You need to be logged in!');
      },

      removeBook: async (parent, { bookId }, context) => {
        if (context.user) {
          return User.findOneAndUpdate(
            { _id: context.user._id },
            {
              $pull: {
                savedBooks: {
                  bookId: bookId,
                },
              },
            },
            { new: true }
          );
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    },
  };
  
  module.exports = resolvers;