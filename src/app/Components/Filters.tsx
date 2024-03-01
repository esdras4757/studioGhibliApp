import { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { FiltersNamesType } from '../Types/appTypes';

interface catalog {
  id: string,
  text: string
}

interface FiltersProps {
  filtersNames: FiltersNamesType;
  getAllMoviesFn: (valule:{}|null) => void
  catalog: catalog[]
}

const Filters = (props: FiltersProps) => {
  const [editFilters, setEditFilters] = useState<any>({});
  const { filtersNames, getAllMoviesFn, catalog } = props;
  const [allLine, setAllLine] = useState(true);


  useEffect(() => {
    const savedEditValues = localStorage.getItem('editvalues');
    if (savedEditValues) {
      setEditFilters(JSON.parse(savedEditValues));
    } else {
      const initialFilters: any = {};
      filtersNames.forEach((element) => {
        if (element && element.id) {
          initialFilters[element.id] = {
            conditions: {
              value: '',
              name: element.id,
              id: element.id,
            },
          };
        }
      });
      setEditFilters(initialFilters);
      localStorage.setItem('editvalues', JSON.stringify(initialFilters));
    }
  }, [filtersNames]);


  const updateFilters = (name: string, newValue: string, id: string):any => {
    setEditFilters((prev: any) => {
      const newFilters = JSON.parse(JSON.stringify(prev));
      newFilters[name] = {
        conditions: {
          value: newValue,
          name: name,
          id: id
        },
      };

      localStorage.setItem('editvalues', JSON.stringify(newFilters));
      return newFilters;
    });
  };


  const resetFilters = () => {
    const initialFilters: any = {};
    filtersNames.forEach((element) => {
      if (element && element.id) {
        initialFilters[element.id] = {
          conditions: {
            value: '',
            name: element.id,
          },
        };
      }
    });
    localStorage.setItem('editvalues', JSON.stringify(initialFilters));
    setEditFilters(initialFilters);
    getAllMoviesFn(initialFilters)
  }


  return (
    <div className='col-12 mb-4'>
      {(
        <div className='d-flex justify-content-between w-100' style={{ overflow: 'hidden', flexWrap: 'wrap' }}>

          <div style={{flexWrap:'wrap'}} className='col-12 d-flex fs-5 align-items-end justify-content-end justify-content-md-between pe-1'>
            {allLine && filtersNames.map((element) => (
              <div className='col-md-6 order-1 order-md-0 col-12 d-flex justify-content-center justify-content-md-start' key={element?.id}>
                <Autocomplete
                className='col-11'
                  disablePortal
                  id="combo-box-"
                  freeSolo={true}
                  onChange={async(event: React.SyntheticEvent<Element, Event>, newValue: any | null) => {
                    if (newValue) {
                      const filtersUpdated= await updateFilters(element?.id || '', newValue.text, newValue.id);
                      getAllMoviesFn(filtersUpdated);
                      return;
                    }
                    const filtersUpdated= await updateFilters(element?.id || '', newValue?.text, newValue?.id);
                    getAllMoviesFn(filtersUpdated);
                  }}
                  options={catalog}
                  sx={{ width: 300 }}
                  value={''}
                  getOptionLabel={(option) => option.text ?option.text :editFilters['title']?.conditions?.value?editFilters['title']?.conditions?.value:''}
                  renderInput={(params) => (
                    <TextField
                      value={editFilters['title']?.conditions?.value }
                      variant="standard"
                      onChange={(e) => {
                        const searchText = e.target.value.toLocaleLowerCase().replace(/\s/g, ''); 
                        const matchingOptions = catalog.filter((el) => el.text.toLocaleLowerCase().replace(/\s/g, '').includes(searchText));
                        const id:any = matchingOptions.map((el) => el.id);                        
                        console.log(id);
                        if (id && id.length > 0) {
                          updateFilters(element?.id || '', e.target.value, id[0]);
                          return;
                        }
                        updateFilters(element?.id || '', e.target.value, e.target.value);
                      }}
                      onKeyDown={(e:any) => {
                        if (e.key === 'Enter') {
                          const searchText = e.target.value.toLocaleLowerCase().replace(/\s/g, ''); 
                          const matchingOptions = catalog.filter((el) => el.text.toLocaleLowerCase().replace(/\s/g, '').includes(searchText));
                          const id:any = matchingOptions.map((el) => el.id);                        
                          console.log(id);
                          if (id && id.length > 0) {
                            console.log(id[0]);
                            const filtersUpdated=updateFilters(element?.id || '', e.target.value, id[0]);
                            getAllMoviesFn(filtersUpdated);
                            return;
                          }
                          const filtersUpdated=updateFilters(element?.id || '', e.target.value, e.target.value);
                          getAllMoviesFn(filtersUpdated);
                        }
                      }}
                      {...params}
                      label={element?.name || ''}
                    />
                  )}
                />

              </div>
            ))}

            <div className='d-md-block order-0 order-md-1 mt-md-0 mt-4 d-flex' style={{ marginTop: allLine ? 'auto' : '10px' }}>
              <i title={allLine ? 'Show filters' : 'Hide filters'} onClick={e => setAllLine(!allLine)} style={{ backgroundColor: '#7B3CCC', borderRadius: 100, padding: 5 }} className={`fas text-white cursor-pointer fa-eye${allLine ? '-slash' : ''} `}></i>
              <i title='Search' onClick={e => {
                getAllMoviesFn(null)
              }} style={{ backgroundColor: 'blue', borderRadius: 100, padding: 5 }} className='fas text-white pointer fa-magnifying-glass mx-2'></i>
              <i title='Reset' onClick={e => { resetFilters() }} style={{ backgroundColor: '#00CCB2', borderRadius: 100, padding: 5 }} className='fas text-white pointer fa-rotate-left me-1 mr-3'></i>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
