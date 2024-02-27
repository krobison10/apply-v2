
export default function useApplicationsFeedURL(params, searchTerm = null, limit = null, offset = null) {
  if (!params) {
    return 'applications';
  }

  const query = new URLSearchParams();

  if (searchTerm) {
    query.append('search', searchTerm);
  }

  params.priority_filters.forEach((filter) => {
    query.append('priority_filters', filter);
  });

  params.status_filters.forEach((filter) => {
    query.append('status_filters', filter);
  });

  if (params.from_days_ago) {
    query.append('from_days_ago', params.from_days_ago);
  }

  if (params.to_days_ago) {
    query.append('to_days_ago', params.to_days_ago);
  }

  if (params.sort) {
    query.append('sort', params.sort);
  }

  if (params.order) {
    query.append('order', params.order);
  }

  if (limit) {
    query.append('limit', limit);
  }

  if (offset) {
    query.append('offset', offset);
  }

  return `applications?${query.toString()}`;
};
