import { useEffect, useState } from "react";
import { SocialMediaPostClass } from "./SocialMediaPost";
import { SalePostClass } from "./SalePost";
import CategoryFilter, { filterData } from "../categoryFilterCompononet/CategoryFilter";
import SocialMediaPosts from "./SocialMediaPosts";
import SalePosts from "./SalePosts";
import { GetSaleAll, GetSaleFiltered, GetSaleFollowings, GetSocialAll, GetSocialFiltered, GetSocialFollowings } from "../logic/backend";
import "./Feed.css"

const Feed: React.FC = () => {
    const [isSocial, setisSocial] = useState(true);
    const [data, setData] = useState<SocialMediaPostClass[] | SalePostClass[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters]= useState<filterData>();
    const [reload, setReload] = useState(false);
      
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          console.log("here");
          if(filters?.postType && filters.postType === "sale") {
            setisSocial(false);
            if(filters.feedType === 'allFeed') {
                const result = await GetSaleAll();
                setData(result);
            } else if(filters.feedType === 'following') {
                const result = await GetSaleFollowings();
                setData(result);
            } else if(filters.feedType === 'filter') {
                const result = await GetSaleFiltered(filters.minPrice, filters.maxPrice, filters.category, filters.itemCategory, filters.text);
                setData(result);
            }
           }
           else if(filters?.postType && filters.postType === "socialMedia") {
            setisSocial(true);
            if(filters.feedType === 'allFeed') {
                const result = await GetSocialAll();
                setData(result);
            } else if(filters.feedType === 'following') {
                const result = await GetSocialFollowings();
                setData(result);
            } else if(filters.feedType === 'filter') {
                const result = await GetSocialFiltered(filters.text);
                setData(result);
            }
           }
        } catch (error) {
          console.error('Error fetching posts:', error);
        } finally {
          setLoading(false);
        }
      };
      if(reload) {
        fetchData();
      }
      setReload(false);
    }, [filters, reload]); 
    
    const handleFilters = (f : filterData) => {
        console.log(f);
        setReload(true);
        setFilters(f);
    }

    return (
      <>
      <div className="feed-container">
        <div className="feed-filter">
        <CategoryFilter onClose={() => {}} onFilterChange={handleFilters} />
        </div>
        <div className="feed-posts">
        {data.length != 0 ? isSocial ? <SocialMediaPosts initialPosts={data as SocialMediaPostClass[]} />: <SalePosts initialPosts={ data as SalePostClass[]}/> : <div>Nothing to see here, unfortunately.</div>}
        </div>
      </div>
      
     
      </>
    );
  };
  
  export default Feed;
  