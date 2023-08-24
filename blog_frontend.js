document.addEventListener('DOMContentLoaded', () => {
    const blogContainer = document.getElementById('blogContainer');
  
    
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');
  
    
    const blogToEdit = sessionStorage.getItem('blogToEdit');
    let blog = null;
  
    if (blogToEdit) {
      blog = JSON.parse(blogToEdit);
    }
  
    
    if (!blog && blogId) {
      fetch(`/blogs/${blogId}`)
        .then(response => response.json())
        .then(fetchedBlog => {
          blog = fetchedBlog;
          displayBlog(blog);
        })
        .catch(error => console.log(error));
    } else {
      displayBlog(blog);
    }
  
    
    function createBlogElement(blog) {
      const blogElement = document.createElement('div');
      blogElement.classList.add('blog');
  
      const titleElement = document.createElement('h2');
      titleElement.textContent = blog.title;
  
      const authorElement = document.createElement('p');
      authorElement.textContent = 'Author: ' + blog.author;
  
      const dateElement = document.createElement('p');
      const date = new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      dateElement.textContent = 'Date: ' + date;
  
      const contentElement = document.createElement('p');
      contentElement.textContent = blog.content;
  
      const buttonContainer = document.createElement('div');
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-btn');
      deleteButton.addEventListener('click', () => {
        deleteBlog(blog._id);
      });
  
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.classList.add('edit-btn');
      editButton.addEventListener('click', () => {
        editBlog(blog);
      });
  
      buttonContainer.appendChild(deleteButton);
      buttonContainer.appendChild(editButton);
  
      blogElement.appendChild(titleElement);
      blogElement.appendChild(authorElement);
      blogElement.appendChild(dateElement);
      blogElement.appendChild(contentElement);
      blogElement.appendChild(buttonContainer);
  
      return blogElement;
    }
  
    
    function displayBlog(blog) {
      if (blog) {
        const blogElement = createBlogElement(blog);
        blogContainer.appendChild(blogElement);
      } else {
        blogContainer.textContent = 'Blog not found.';
      }
    }
  
    
    function deleteBlog(id) {
      fetch(`/blogs/${id}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
          
          window.location.href = 'index.html';
        })
        .catch(error => console.log(error));
    }
  
    
    function editBlog(blog) {
      
      sessionStorage.setItem('blogToEdit', JSON.stringify(blog));
  
      window.location.href = `/create.html?id=${blog._id}`;
    }
  });
  