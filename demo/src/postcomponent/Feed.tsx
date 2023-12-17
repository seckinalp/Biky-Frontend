import { useEffect, useState } from "react";
import { SocialMediaPostClass } from "./SocialMediaPost";
import { SalePostClass } from "./SalePost";
import CategoryFilter, { CategoryFilterProps, filterData } from "../categoryFilterCompononet/CategoryFilter";
import SocialMediaPosts from "./SocialMediaPosts";
import SalePosts from "./SalePosts";


const ProfileFeed: React.FC<void> = () => {
    const [isSocial, setisSocial] = useState(true);
    const [data, setData] = useState<SocialMediaPostClass[] | SalePostClass[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters]= useState<filterData>();
      
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          if(filters?.feedType && filters.feedType === "allFeed" ) {
            
          }
        } catch (error) {
          console.error('Error fetching posts:', error);
        } finally {
          setLoading(false);
        }
      };
        fetchData();
    }, [filters]); 
    
    const handleFilters = (f : filterData) => {
        setFilters(f);
    }

    return (
      <>
      <CategoryFilter onClose={() => {}} onFilterChange={handleFilters} />
      {isSocial ? <SocialMediaPosts initialPosts={data as SocialMediaPostClass[]} />: <SalePosts initialPosts={ data as SalePostClass[]}/>}
      </>
    );
  };
  
  export default ProfileFeed;
  