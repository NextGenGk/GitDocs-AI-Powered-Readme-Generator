# Production Deployment Guide

## Environment Variables

Ensure these environment variables are set in your production environment:

### Required Variables

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Gemini AI API
GEMINI_API_KEY=AIza...

# Optional: GitHub Token (for higher rate limits)
GITHUB_TOKEN=ghp_...
```

### Clerk Configuration

1. Set up production Clerk application
2. Configure allowed domains and redirect URLs
3. Update environment variables with production keys

### Supabase Configuration

1. Run the complete database setup script in your Supabase SQL Editor:

   - Copy the entire content from `scripts/complete-database-setup.sql`
   - Paste and execute in Supabase Dashboard → SQL Editor
   - The script will create the table, set permissions, and verify everything works

2. The script sets up:
   - `users` table with proper schema
   - Indexes for performance
   - Permissions for anon/authenticated roles
   - Updated timestamp triggers
   - Verification tests

## Build and Deploy

### Build the Application

```bash
npm run build
```

### Deploy Options

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Similar GitHub integration with build commands
- **Docker**: Use the included Dockerfile for containerized deployment

## Performance Optimizations

### Database

- Enable connection pooling in Supabase
- Monitor query performance
- Set up proper indexes if needed

### API Rate Limiting

- The app includes built-in user limits (3 READMEs per account)
- Consider implementing additional rate limiting at the infrastructure level

### Monitoring

- Set up error tracking (Sentry, LogRocket, etc.)
- Monitor API response times
- Track user generation patterns

## Security Checklist

- ✅ Environment variables secured
- ✅ Database permissions configured
- ✅ User authentication required
- ✅ Input validation on all endpoints
- ✅ Rate limiting implemented
- ✅ Debug code removed
- ✅ Error messages sanitized

## Post-Deployment Testing

1. Test user registration and authentication
2. Verify README generation with various GitHub repositories
3. Confirm usage limits are enforced
4. Test error handling with invalid inputs
5. Monitor database updates and user counts

## Maintenance

### Regular Tasks

- Monitor Gemini API usage and costs
- Review user generation patterns
- Update dependencies regularly
- Backup database regularly

### Scaling Considerations

- Monitor API response times
- Consider caching for frequently accessed repositories
- Implement queue system for high-volume usage
- Set up database read replicas if needed
