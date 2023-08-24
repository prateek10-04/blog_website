document.addEventListener('DOMContentLoaded', () => {
  const blogsContainer = document.getElementById('blogsContainer');

  
  fetch('/blogs')
    .then(response => response.json())
    .then(blogs => {
      
      blogs.forEach((blog) => {
        const blogElement = createBlogElement(blog);
        blogsContainer.appendChild(blogElement);
      });
    })
    .catch(error => console.log(error));

  
  function createBlogElement(blog) {
    const blogElement = document.createElement('div');
    blogElement.classList.add('blog');

    const titleElement = document.createElement('h2');
    titleElement.textContent = blog.title;
    titleElement.classList.add('blog-title');

    const authorElement = document.createElement('p');
    authorElement.textContent = 'Author: ' + blog.author;

    const dateElement = document.createElement('p');
    const date = new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    dateElement.textContent = 'Date: ' + date;

    const contentElement = document.createElement('p');
    contentElement.textContent = blog.content;

    const blogLink = document.createElement('a');
    blogLink.href = `blog.html?id=${blog._id}`;
    blogLink.appendChild(titleElement);

    document.getElementById("blogsContainer").style.textDecoration="none";


    blogElement.appendChild(blogLink);
    blogElement.appendChild(authorElement);
    blogElement.appendChild(dateElement);
    blogElement.appendChild(contentElement);

    return blogElement;
  }
});