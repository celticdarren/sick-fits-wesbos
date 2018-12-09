const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
  async createItem(parent, args, ctx, info) {
    //TODO: check if they are logged in

    const item = await ctx.db.mutation.createItem({
      data: {
        ...args
      }
    }, info);

    return item;
  },

  updateItem(parent, args, ctx, info) {
    //First take a copy of the updates
    const updates = { ...args };
    //remove Id from updates
    delete updates.id;
    // run the update method;

    return ctx.db.mutation.updateItem({
      data: updates,
      where: {
        id: args.id
      }
    }, info);
  },

  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. Find the item
    const item = await ctx.db.query.item({ where }, `{ id title }`);
    //2. Check if they own or have permissions to delete
    // TODO
    //3. Delete
    return ctx.db.mutation.deleteItem({ where }, info);

  },

  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    //hash their password
    const password = await bcrypt.hash(args.password, 10);
    //create user in db
    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        password,
        permissions: { set: ['USER'] }
      }
    }, info);
    //Create JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // Set JWT as cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });
    // Return user to the browser
    return user;
  }
};

module.exports = Mutations;
