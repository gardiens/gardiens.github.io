import React from 'react';
import {useProcessor} from './PrintMarkdown';


/*
const importAll = (r) => r.keys().map(r);
const markdownFiles = importAll(require.context('../pages/', false, /\.md$/)) // in ../../public/ /\pages\/blog\/.*.md$/
  .sort()
  .reverse();
*/

// use import ES6 to import all the markdown files



/*

class MdRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { posts: [] };
    }
    
    

    async componentDidMount() {
        const posts = [];
        const file = await import('./rendu.md');
        const response = await fetch(file.default)
          .then((res) => res)
          .catch((err) => console.error(err));
        const text = await response.text();
        posts.push(text);
    
        this.setState((state) => ({ ...state, posts }));
        
      }
    
      render() {
        const { posts } = this.state;
        return (
            <div>
                <MDComponent posts={posts}/>
            </div>
            ); 
        }
}

function PrintComponent({ Content}) {
    return Content;
}

function MDComponent({posts}) {
    const [Content, Attributes] = useProcessor(posts[0]);
    return (
        <div className="markdown-body">
            <PrintComponent Content={Content}/>
        </div>
        );
}

export default MdRenderer;

*/
/*
export default function MdRenderer() {
    return (
        <div className="markdown-body">
        </div>
        );
}*/
