/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	list: function (req, res) {
    	Post.find({}).sort('updatedAt DESC').exec(function (err, posts) {
      		return res.view("post/index", {
        		title: "MIS 討論版 - BETA測試",
        		posts: posts
      		});
    	});
  	},

  	create: function(req, res) {
  		
  		var title = req.body.title;
  		var user = req.body.user;
  		var content = req.body.content;

  		Post.create({
  			title: title,
  			user: user,
  			content: content
  		}).exec(function (err, post){
  			if(err) {
  				return res.erro();
  			}
  			req.flash('info', 'info: Create post success !!!');
      		res.redirect("/post");
  		});

  	},

  	read: function(req, res) {
  		// Use param to get the varaible after url
  		var id = req.param("id");
  		//console.log(id);
  		// exception id not an int
  		if (isNaN(id)) {
       	req.flash("info", "info: you point to wrong number");
       	return res.redirect("/");
     	}	

  		Post.findOne(id).exec(function (err, post){
  			res.view("post/read", {
  				post: post
  				// title: post.title + " - blog post",
  				// user: post.user,
  				// content: post.content
  			});
  		});
  	},

  	updatePage: function(req, res) {
  		// Use param to get the varaible after url
  		var id = req.param("id");
  		// exception id not an int
  		if (isNaN(id)) {
       	req.flash("info", "info: you point to wrong number");
       	return res.redirect("/");
     	}	

  		Post.findOne(id).exec(function (err, post){
  			res.view("post/update", {
  				post: post
  				// title: post.title + " - blog post",
  				// user: post.user,
  				// content: post.content
  			});
  		});
  	},


  	update: function (req, res) {
  		//console.log("inside");
	    var id = req.param("id");
	    var title = req.body.title;
	    var user = req.body.user;
	    var content = req.body.content;

	    if (title && content && user && title.length > 0 && content.length > 0 && user.length >0) {
	      // update post
	      Post.update({
	        id: id
	      }, {
	        title: title,
	        user: user,
	        content: content
	      })
	      .exec(function (err, post) {
	        if (err) {
	          req.flash("info", "info: you point to wrong number");
	          return res.redirect("/post");
	        }
	        return res.redirect("/post/" + id);
	        // why can't post.id ???
	      })
	      return;
	    };
	},

	destroy: function (req, res) {
		var id = req.param("id");
		Post.destroy({id: id}).exec(function (err, post) {
			if (err) {
	          req.flash("info", "info: you point to wrong number");
	          return res.redirect("/post");
	        }
	        return res.redirect("/post");
		});
	}

};

